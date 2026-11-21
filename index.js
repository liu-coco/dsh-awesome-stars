/**
 * Host half of Awesome stars.
 *
 * The published market index (`index.json`) declares neither star values nor a
 * sortable star key, so this plugin reads the catalog site's own registry
 * (`plugins.json`, built with GitHub star data) and serves the installable
 * subset to the browser tab it adds to the Plugins page.
 *
 * GET /api/awesome-stars/data
 *   -> { fetchedAt, total, stale, source, items: [...] }
 *   ?refresh=1 waits for a fresh upstream fetch instead of returning cache.
 */
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROUTE = '/api/awesome-stars/data'
const UPSTREAM = 'https://awesome-dsh-plugin.com/plugins.json'
const SOURCE = 'awesome-dsh-plugin.com'
const FETCH_TIMEOUT_MS = 120_000
const CACHE_TTL_MS = 6 * 60 * 60 * 1000
const MIN_ITEMS = 1000
const DESCRIPTION_LIMIT = 160

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SNAPSHOT_FILE = path.join(HERE, 'snapshot.json')
const CACHE_FILE = path.join(os.tmpdir(), 'dsh-awesome-stars-cache-v1.json')

/** @type {null | { fetchedAt: number, total: number, items: object[] }} */
let current = null
/** @type {null | Promise<object>} */
let refreshing = null

/**
 * @param {unknown} value
 * @returns {string}
 */
function shorten(value) {
  if (typeof value !== 'string') return ''
  return value.length > DESCRIPTION_LIMIT
    ? `${value.slice(0, DESCRIPTION_LIMIT - 1)}…`
    : value
}

/**
 * Project the catalog registry onto the entries the market index can install.
 * @param {any} site
 */
function project(site) {
  const items = []
  for (const plugin of Array.isArray(site?.plugins) ? site.plugins : []) {
    const name = typeof plugin?.npm === 'string' ? plugin.npm.trim() : ''
    const version = typeof plugin?.version === 'string' ? plugin.version : ''
    if (!name || !version) continue
    items.push({
      name,
      title: typeof plugin.owner === 'string' && plugin.owner
        ? `${plugin.owner}/${plugin.name}`
        : String(plugin.name ?? name),
      homepage: typeof plugin.page === 'string' ? plugin.page : null,
      description: {
        en: shorten(plugin.description?.en),
        zh: shorten(plugin.description?.zh),
      },
      version,
      stars: typeof plugin.stars === 'number' && Number.isFinite(plugin.stars) ? plugin.stars : null,
      starsCheckedAt: typeof plugin.starsCheckedAt === 'string' ? plugin.starsCheckedAt : null,
      category: typeof plugin.category === 'string' ? plugin.category : null,
    })
  }
  items.sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1) || a.title.localeCompare(b.title))
  return { fetchedAt: Date.now(), total: items.length, items }
}

/** @param {string} file */
async function readJSON(file) {
  try {
    const value = JSON.parse(await fs.readFile(file, 'utf8'))
    if (!Array.isArray(value?.items) || value.items.length === 0) return null
    return {
      fetchedAt: typeof value.fetchedAt === 'number' ? value.fetchedAt : 0,
      total: value.items.length,
      items: value.items,
    }
  } catch {
    return null
  }
}

async function refresh() {
  const response = await fetch(UPSTREAM, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`upstream HTTP ${response.status}`)
  const next = project(await response.json())
  if (next.total < MIN_ITEMS) throw new Error(`upstream returned only ${next.total} installable entries`)
  current = next
  void fs.writeFile(CACHE_FILE, JSON.stringify(next)).catch(() => {})
  return next
}

function startRefresh() {
  if (!refreshing) {
    refreshing = refresh().finally(() => {
      refreshing = null
    })
  }
  return refreshing
}

/**
 * @param {boolean} force
 */
async function getData(force) {
  if (!current) current = await readJSON(CACHE_FILE) ?? await readJSON(SNAPSHOT_FILE)

  if (force) {
    try {
      return { payload: await startRefresh(), stale: false, error: null }
    } catch (error) {
      if (current) return { payload: current, stale: true, error: messageOf(error) }
      throw error
    }
  }
  if (current && Date.now() - current.fetchedAt < CACHE_TTL_MS) {
    return { payload: current, stale: false, error: null }
  }
  if (current) {
    void startRefresh().catch(() => {})
    return { payload: current, stale: true, error: null }
  }
  return { payload: await startRefresh(), stale: false, error: null }
}

/** @param {unknown} error */
function messageOf(error) {
  return error instanceof Error ? error.message : String(error)
}

/**
 * @param {number} status
 * @param {unknown} body
 */
function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

/** @param {Request} request */
async function serve(request) {
  const force = new URL(request.url).searchParams.get('refresh') === '1'
  try {
    const { payload, stale, error } = await getData(force)
    return json(200, {
      fetchedAt: payload.fetchedAt,
      total: payload.total,
      stale,
      error,
      source: SOURCE,
      items: payload.items,
    })
  } catch (error) {
    return json(503, { error: messageOf(error), source: SOURCE })
  }
}

/** @param {any} ctx */
export function apply(ctx) {
  ctx.inject(['connection'], (scope) => {
    scope.effect(
      () => scope.connection.fetch.register({
        path: ROUTE,
        methods: ['GET'],
        requestBody: 'buffered',
        fetch: serve,
      }),
      `awesome-stars: ${ROUTE}`,
    )
  })
}
