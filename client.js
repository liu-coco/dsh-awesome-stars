window.__ModuleLoader__.load({
  id: 'dsh-awesome-stars',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'awesome-stars'
    const ENDPOINT = 'api/awesome-stars/data'
    const PAGE = 60
    const SORTS = ['stars', 'starsAsc', 'name']

    const LOCALES = {
      zh: {
        tab: '发现',
        kicker: 'STAR INDEX · AWESOME DSH PLUGIN',
        title: '插件目录',
        titleAccent: '按 GitHub Star 排行',
        subtitle: '可直接安装的 {n} 个插件，按社区热度排序',
        statPlugins: '插件',
        statTop: '最高 STAR',
        statUpdated: '数据时间',
        search: '搜索插件名、描述、分类…',
        sortStars: 'Star 榜',
        sortStarsAsc: 'Star 升序',
        sortName: '名称',
        all: '全部',
        loading: '正在连接目录…',
        empty: '没有匹配的插件',
        emptyHint: '换个关键词，或清空筛选条件。',
        retry: '重试',
        more: '加载更多',
        remaining: '还有 {n} 个',
        install: '安装',
        installTitle: '安装 {name}',
        package: '包名',
        version: '版本',
        category: '分类',
        checked: 'STAR 校验',
        copy: '复制命令',
        copied: '已复制',
        openCatalog: '打开目录页',
        refresh: '刷新',
        refreshing: '同步中…',
        errorDetail: '加载失败：{error}',
        stale: '正在后台同步，当前显示缓存数据。',
        staleError: '同步失败，显示缓存数据：{error}',
        noStars: '未获取到 Star',
        foot: '共 {n} 个插件',
        source: '数据来源 awesome-dsh-plugin.com · Star 由 GitHub 提供',
        stars: 'STARS',
      },
      en: {
        tab: 'Discover',
        kicker: 'STAR INDEX · AWESOME DSH PLUGIN',
        title: 'Plugin catalog',
        titleAccent: 'ranked by GitHub stars',
        subtitle: '{n} installable plugins, ordered by community traction',
        statPlugins: 'PLUGINS',
        statTop: 'TOP STARS',
        statUpdated: 'UPDATED',
        search: 'Search name, description, category…',
        sortStars: 'Stars',
        sortStarsAsc: 'Stars asc',
        sortName: 'Name',
        all: 'All',
        loading: 'Connecting to the catalog…',
        empty: 'No matching plugins',
        emptyHint: 'Try another keyword or clear the filters.',
        retry: 'Retry',
        more: 'Load more',
        remaining: '{n} more',
        install: 'Install',
        installTitle: 'Install {name}',
        package: 'package',
        version: 'version',
        category: 'category',
        checked: 'STARS CHECKED',
        copy: 'Copy command',
        copied: 'Copied',
        openCatalog: 'Open catalog page',
        refresh: 'Refresh',
        refreshing: 'Syncing…',
        errorDetail: 'Could not load: {error}',
        stale: 'Syncing in the background; showing cached data.',
        staleError: 'Sync failed; showing cached data: {error}',
        noStars: 'No star data',
        foot: '{n} plugins',
        source: 'Data from awesome-dsh-plugin.com · stars measured by GitHub',
        stars: 'STARS',
      },
    }

    const CSS = [
      /* shell */
      '.das{display:flex;flex-direction:column;gap:14px;color:var(--dsw-alias-label-primary,inherit);font-size:13px;line-height:18px;}',
      '.das *{box-sizing:border-box;}',
      '.das-mono{font-family:ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,monospace;font-variant-numeric:tabular-nums;}',
      /* hero */
      '.das-hero{position:relative;overflow:hidden;padding:18px 20px 16px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:var(--dsw-radius-lg,12px);background:linear-gradient(118deg,color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 11%,var(--dsw-alias-bg-layer-1,#fff)),var(--dsw-alias-bg-layer-1,#fff) 62%);}',
      '.das-hero::before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.75;background-image:linear-gradient(color-mix(in srgb,var(--dsw-alias-label-primary,#000) 6%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--dsw-alias-label-primary,#000) 6%,transparent) 1px,transparent 1px);background-size:26px 26px;-webkit-mask-image:radial-gradient(130% 110% at 8% -10%,#000 6%,transparent 68%);mask-image:radial-gradient(130% 110% at 8% -10%,#000 6%,transparent 68%);}',
      '.das-hero::after{content:"";position:absolute;right:-70px;top:-90px;width:240px;height:240px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 30%,transparent),transparent 68%);}',
      '.das-hero-body{position:relative;z-index:1;display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap;}',
      '.das-kicker{display:flex;align-items:center;gap:7px;margin-bottom:8px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;line-height:14px;letter-spacing:.18em;color:var(--dsw-alias-state-business-primary,#4c8dff);}',
      '.das-kicker::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 0 3px color-mix(in srgb,currentColor 18%,transparent);}',
      '.das-h{margin:0;font-size:19px;line-height:26px;font-weight:600;letter-spacing:-.2px;}',
      '.das-h em{font-style:normal;font-weight:400;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-sub{margin:5px 0 0;font-size:12px;line-height:17px;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-stats{position:relative;z-index:1;display:flex;gap:20px;flex-wrap:wrap;}',
      '.das-stat{display:flex;flex-direction:column;gap:2px;min-width:56px;}',
      '.das-stat span{font-size:9.5px;line-height:12px;letter-spacing:.14em;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-stat b{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums;font-size:17px;line-height:22px;font-weight:600;}',
      /* toolbar */
      '.das-toolbar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
      '.das-search{position:relative;flex:1 1 220px;min-width:180px;display:flex;align-items:center;}',
      '.das-search svg{position:absolute;left:10px;width:13px;height:13px;color:var(--dsw-alias-label-tertiary,inherit);pointer-events:none;}',
      '.das-search input{width:100%;padding:7px 12px 7px 29px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:999px;background:var(--dsw-alias-bg-layer-1,#fff);color:var(--dsw-alias-label-primary,inherit);font:inherit;font-size:12.5px;line-height:18px;outline:none;transition:border-color .15s,box-shadow .15s;}',
      '.das-search input::placeholder{color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-search input:focus{border-color:var(--dsw-alias-state-business-primary,#4c8dff);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 14%,transparent);}',
      '.das-seg{display:inline-flex;align-items:center;gap:2px;padding:2px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:999px;background:var(--dsw-alias-bg-layer-1,#fff);}',
      '.das-seg button{padding:4px 10px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary,inherit);font:inherit;font-size:11.5px;line-height:16px;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s;}',
      '.das-seg button:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.05));}',
      '.das-seg button[aria-pressed="true"]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 14%,transparent);color:var(--dsw-alias-state-business-primary,#4c8dff);font-weight:500;}',
      '.das-ghost{padding:6px 12px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary,inherit);font:inherit;font-size:11.5px;line-height:16px;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s;}',
      '.das-ghost:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.05));color:var(--dsw-alias-label-primary,inherit);}',
      '.das-ghost:disabled{opacity:.5;cursor:default;}',
      /* category chips */
      '.das-chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,#000 92%,transparent);mask-image:linear-gradient(90deg,#000 92%,transparent);}',
      '.das-chips::-webkit-scrollbar{display:none;}',
      '.das-chips button{flex:none;padding:3px 10px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:999px;background:transparent;color:var(--dsw-alias-label-tertiary,inherit);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10.5px;line-height:16px;letter-spacing:.02em;cursor:pointer;transition:color .15s,border-color .15s,background .15s;}',
      '.das-chips button:hover{color:var(--dsw-alias-label-primary,inherit);border-color:var(--dsw-alias-border-l3,transparent);}',
      '.das-chips button[aria-pressed="true"]{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 55%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 10%,transparent);color:var(--dsw-alias-state-business-primary,#4c8dff);}',
      '.das-chips button i{font-style:normal;opacity:.55;margin-left:5px;}',
      /* notices */
      '.das-note{display:flex;align-items:center;gap:8px;margin:0;padding:7px 11px;border-radius:var(--dsw-radius-md,8px);border:0.5px solid var(--dsw-alias-border-l2,transparent);background:var(--dsw-alias-bg-layer-2,rgba(0,0,0,.03));color:var(--dsw-alias-label-secondary,inherit);font-size:11.5px;line-height:16px;}',
      '.das-note::before{content:"";width:5px;height:5px;flex:none;border-radius:50%;background:var(--dsw-alias-state-warn-primary,#d99a00);}',
      '.das-error{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--dsw-radius-md,8px);border:0.5px solid color-mix(in srgb,var(--dsw-alias-state-error-primary,#e5484d) 55%,transparent);color:var(--dsw-alias-label-primary,inherit);font-size:12px;line-height:17px;}',
      '.das-error span{flex:1;min-width:0;}',
      /* list */
      '.das-list{margin:0;padding:0;list-style:none;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:var(--dsw-radius-lg,12px);background:var(--dsw-alias-bg-layer-1,#fff);overflow:hidden;}',
      '.das-item + .das-item{border-top:0.5px solid var(--dsw-alias-border-l1,rgba(0,0,0,.06));}',
      '.das-row{position:relative;display:grid;grid-template-columns:26px 62px minmax(0,1fr) auto;align-items:center;gap:12px;padding:8px 14px 8px 12px;cursor:pointer;transition:background .15s;}',
      '.das-row::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--dsw-alias-state-business-primary,#4c8dff),color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 25%,transparent));opacity:0;transition:opacity .15s;}',
      '.das-row:hover{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 5%,transparent);}',
      '.das-row:hover::before,.das-row[data-open="true"]::before{opacity:1;}',
      '.das-row[data-open="true"]{background:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 4%,transparent);}',
      '.das-row:focus-visible{outline:none;box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 50%,transparent);}',
      '.das-rank{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10.5px;line-height:14px;letter-spacing:.04em;color:var(--dsw-alias-label-tertiary,inherit);text-align:right;}',
      '.das-rank[data-top="true"]{color:var(--dsw-alias-state-business-primary,#4c8dff);font-weight:600;}',
      '.das-star{display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-width:0;}',
      '.das-star b{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums;font-size:14px;line-height:17px;font-weight:600;letter-spacing:-.1px;}',
      '.das-star small{font-size:8.5px;line-height:10px;letter-spacing:.12em;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-meter{width:56px;height:3px;border-radius:3px;background:color-mix(in srgb,var(--dsw-alias-label-primary,#000) 10%,transparent);overflow:hidden;}',
      '.das-meter i{display:block;height:100%;border-radius:3px;background:linear-gradient(90deg,color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 40%,transparent),var(--dsw-alias-state-business-primary,#4c8dff) 55%,var(--dsw-static-violet-400,#a78bfa));box-shadow:0 0 6px color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 55%,transparent);}',
      '.das-main{min-width:0;display:flex;flex-direction:column;gap:1px;}',
      '.das-nameline{display:flex;align-items:center;gap:7px;min-width:0;}',
      '.das-name{min-width:0;padding:0;border:0;background:none;color:var(--dsw-alias-label-primary,inherit);font:inherit;font-size:13.5px;line-height:19px;font-weight:500;text-align:left;cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
      '.das-name:hover{color:var(--dsw-alias-state-business-primary,#4c8dff);}',
      '.das-ver{flex:none;padding:1px 5px;border-radius:var(--dsw-radius-xs,4px);background:var(--dsw-alias-bg-module-platform,rgba(0,0,0,.05));font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:9.5px;line-height:13px;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-desc{margin:0;font-size:11.5px;line-height:16px;color:var(--dsw-alias-label-tertiary,inherit);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
      '.das-cat{flex:none;padding:0 6px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:999px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:8.5px;line-height:13px;letter-spacing:.08em;text-transform:lowercase;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-install{flex:none;padding:4px 12px;border:0.5px solid var(--dsw-alias-border-l3,transparent);border-radius:999px;background:transparent;color:var(--dsw-alias-label-primary,inherit);font:inherit;font-size:11.5px;line-height:16px;cursor:pointer;transition:background .15s,border-color .15s,color .15s;}',
      '.das-install:hover{background:var(--dsw-alias-state-business-primary,#4c8dff);border-color:transparent;color:var(--dsw-alias-label-primary-foreground,#fff);}',
      /* detail */
      '.das-detail{padding:0 14px 12px 100px;}',
      '.das-detail p{margin:0 0 9px;font-size:11.5px;line-height:17px;color:var(--dsw-alias-label-secondary,inherit);}',
      '.das-facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px 14px;margin:0 0 10px;padding:9px 11px;border-radius:var(--dsw-radius-md,8px);background:var(--dsw-alias-bg-layer-2,rgba(0,0,0,.03));}',
      '.das-fact{display:flex;flex-direction:column;gap:1px;min-width:0;}',
      '.das-fact span{font-size:8.5px;line-height:11px;letter-spacing:.14em;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-fact b{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;line-height:15px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
      '.das-cmdline{display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;}',
      '.das-cmd{padding:3px 8px;border-radius:var(--dsw-radius-xs,4px);background:var(--dsw-alias-bg-module-platform,rgba(0,0,0,.05));color:var(--dsw-alias-label-secondary,inherit);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10.5px;line-height:15px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;}',
      '.das-links{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
      '.das-link{padding:3px 9px;border:0.5px solid var(--dsw-alias-border-l2,transparent);border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary,inherit);font:inherit;font-size:10.5px;line-height:15px;text-decoration:none;cursor:pointer;}',
      '.das-link:hover{color:var(--dsw-alias-label-primary,inherit);border-color:var(--dsw-alias-border-l3,transparent);background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.05));}',
      '.das-link[data-done="true"]{color:var(--dsw-alias-state-success-primary,#2e9e5b);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary,#2e9e5b) 40%,transparent);}',
      '.das-link[data-kind="primary"]{border-color:color-mix(in srgb,var(--dsw-alias-state-business-primary,#4c8dff) 45%,transparent);color:var(--dsw-alias-state-business-primary,#4c8dff);}',
      '.das-link[data-kind="primary"]:hover{background:var(--dsw-alias-state-business-primary,#4c8dff);border-color:transparent;color:var(--dsw-alias-label-primary-foreground,#fff);}',
      /* misc */
      '.das-more{align-self:center;margin-top:2px;}',
      '.das-empty{display:flex;flex-direction:column;align-items:center;gap:4px;padding:34px 0;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-empty b{font-size:13px;font-weight:500;color:var(--dsw-alias-label-secondary,inherit);}',
      '.das-empty span{font-size:11.5px;line-height:16px;}',
      '.das-skels{display:flex;flex-direction:column;gap:6px;}',
      '.das-skel{height:44px;border-radius:var(--dsw-radius-md,8px);background:linear-gradient(90deg,var(--dsw-alias-bg-skeleton,rgba(0,0,0,.05)) 20%,color-mix(in srgb,var(--dsw-alias-bg-skeleton,rgba(0,0,0,.05)) 40%,transparent) 40%,var(--dsw-alias-bg-skeleton,rgba(0,0,0,.05)) 60%);background-size:280% 100%;animation:das-shimmer 1.5s linear infinite;}',
      '@keyframes das-shimmer{0%{background-position:130% 0}100%{background-position:-30% 0}}',
      '.das-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0;font-size:10.5px;line-height:15px;color:var(--dsw-alias-label-tertiary,inherit);}',
      '.das-foot span b{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:500;color:var(--dsw-alias-label-secondary,inherit);}',
      '@media (max-width:620px){.das-row{grid-template-columns:20px 56px minmax(0,1fr);}.das-install{display:none;}.das-detail{padding-left:14px;}.das-stats{gap:14px;}}',
      '[data-theme="dark"] .das-hero::before{opacity:.5;}',
    ].join('')

    function formatStars(count) {
      if (typeof count !== 'number' || !Number.isFinite(count)) return '—'
      if (count < 0) return '0'
      if (count < 1000) return String(Math.round(count))
      if (count < 10000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
      return (Math.round(count / 100) / 10) + 'k'
    }

    function formatCount(count, language) {
      if (typeof count !== 'number' || !Number.isFinite(count)) return '—'
      try {
        return new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : 'en-US').format(count)
      } catch {
        return String(count)
      }
    }

    function formatDate(value, language, withTime) {
      if (!value) return '—'
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return String(value).slice(0, 10)
      try {
        return date.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', withTime
          ? { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
          : { year: 'numeric', month: 'short', day: 'numeric' })
      } catch {
        return String(value).slice(0, 10)
      }
    }

    function pickDescription(item, language) {
      const text = item.description || {}
      return text[language] || text[language === 'zh' ? 'en' : 'zh'] || ''
    }

    function meterWidth(stars, peak) {
      if (typeof stars !== 'number' || !Number.isFinite(stars) || stars <= 0) return '0%'
      const top = Math.max(1, peak || 1)
      const ratio = Math.log10(stars + 1) / Math.log10(top + 1)
      return Math.max(3, Math.round(ratio * 100)) + '%'
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, LOCALES), 'awesome-stars: locale')

      function Row(props) {
        const { item, rank, peak, language, t, open, onToggle, onInstall, onCopy, copied } = props
        const description = pickDescription(item, language)
        const current = typeof item.stars === 'number' && Number.isFinite(item.stars)
        const checked = item.starsCheckedAt ? formatDate(item.starsCheckedAt, language, false) : ''
        const href = item.homepage
        return h('li', { className: 'das-item' },
          h('div', {
            className: 'das-row',
            role: 'button',
            tabIndex: 0,
            'data-open': open ? 'true' : 'false',
            'aria-expanded': open,
            onClick: onToggle,
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onToggle()
              }
            },
          },
            h('span', { className: 'das-rank', 'data-top': rank <= 3 ? 'true' : 'false' },
              '#' + String(rank).padStart(2, '0')),
            h('span', { className: 'das-star' },
              h('b', null, current ? formatStars(item.stars) : t('noStars')),
              h('span', { className: 'das-meter', 'aria-hidden': 'true' },
                h('i', { style: { width: meterWidth(item.stars, peak) } })),
              h('small', null, t('stars')),
            ),
            h('span', { className: 'das-main' },
              h('span', { className: 'das-nameline' },
                h('span', { className: 'das-name', title: item.title }, item.title),
                item.version ? h('span', { className: 'das-ver' }, item.version) : null,
                item.category ? h('span', { className: 'das-cat' }, item.category) : null,
              ),
              description
                ? h('span', { className: 'das-desc' }, description)
                : h('span', { className: 'das-desc' }, item.name),
            ),
            h('button', {
              className: 'das-install',
              type: 'button',
              title: t('installTitle', { name: item.name }),
              onClick: (event) => {
                event.stopPropagation()
                onInstall()
              },
            }, t('install')),
          ),
          open
            ? h('div', { className: 'das-detail' },
              description ? h('p', null, description) : null,
              h('div', { className: 'das-facts' },
                h('span', { className: 'das-fact' },
                  h('span', null, t('package')),
                  h('b', { title: item.name }, item.name)),
                h('span', { className: 'das-fact' },
                  h('span', null, t('version')),
                  h('b', null, item.version || '—')),
                h('span', { className: 'das-fact' },
                  h('span', null, t('category')),
                  h('b', null, item.category || '—')),
                h('span', { className: 'das-fact' },
                  h('span', null, t('checked')),
                  h('b', null, checked || '—')),
              ),
              h('div', { className: 'das-cmdline' },
                h('code', { className: 'das-cmd' }, 'dsh plugin add ' + item.name + '@' + item.version),
                h('button', {
                  className: 'das-link',
                  type: 'button',
                  'data-done': copied ? 'true' : 'false',
                  onClick: (event) => {
                    event.stopPropagation()
                    onCopy()
                  },
                }, copied ? t('copied') : t('copy')),
              ),
              h('div', { className: 'das-links' },
                h('button', {
                  className: 'das-link',
                  type: 'button',
                  'data-kind': 'primary',
                  onClick: (event) => {
                    event.stopPropagation()
                    onInstall()
                  },
                }, t('install')),
                href
                  ? h('a', {
                    className: 'das-link',
                    href,
                    target: '_blank',
                    rel: 'noreferrer',
                    onClick: (event) => event.stopPropagation(),
                  }, t('openCatalog'))
                  : null,
              ),
            )
            : null,
        )
      }

      function StarsTab(props) {
        const t = ctx.locale.bind(NS)
        const locale = React.useSyncExternalStore(
          (listener) => ctx.locale.subscribe(listener),
          () => ctx.locale.getSnapshot(),
        )
        const language = locale && locale.active === 'zh' ? 'zh' : 'en'

        const [data, setData] = React.useState(null)
        const [loading, setLoading] = React.useState(true)
        const [busy, setBusy] = React.useState(false)
        const [error, setError] = React.useState('')
        const [notice, setNotice] = React.useState(null)
        const [query, setQuery] = React.useState('')
        const [category, setCategory] = React.useState('all')
        const [sort, setSort] = React.useState('stars')
        const [limit, setLimit] = React.useState(PAGE)
        const [openName, setOpenName] = React.useState('')
        const [copied, setCopied] = React.useState('')

        const load = React.useCallback(async (force) => {
          setBusy(force)
          try {
            const url = new URL(ENDPOINT, document.baseURI)
            if (force) url.searchParams.set('refresh', '1')
            const response = await fetch(url.href, {
              cache: 'no-store',
              credentials: 'same-origin',
              headers: { accept: 'application/json' },
            })
            const body = await response.json().catch(() => null)
            if (!response.ok) {
              throw new Error(body && body.error ? body.error : 'HTTP ' + response.status)
            }
            setData(body)
            setError('')
            setNotice(body.stale ? (body.error ? { kind: 'staleError', error: body.error } : { kind: 'stale' }) : null)
          } catch (failure) {
            setError(String((failure && failure.message) || failure))
          } finally {
            setLoading(false)
            setBusy(false)
          }
        }, [])

        React.useEffect(() => { void load(false) }, [load])
        React.useEffect(() => { setLimit(PAGE) }, [query, category, sort])
        React.useEffect(() => {
          if (!copied) return undefined
          const timer = setTimeout(() => setCopied(''), 1600)
          return () => clearTimeout(timer)
        }, [copied])

        const items = (data && data.items) || []

        const categories = React.useMemo(() => {
          const counts = new Map()
          for (const item of items) {
            const key = item.category || 'other'
            counts.set(key, (counts.get(key) || 0) + 1)
          }
          return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
        }, [items])

        const peak = React.useMemo(() => {
          let max = 1
          for (const item of items) if (typeof item.stars === 'number' && item.stars > max) max = item.stars
          return max
        }, [items])

        const visible = React.useMemo(() => {
          const needle = query.trim().toLowerCase()
          const matched = items.filter((item) => {
            if (category !== 'all' && (item.category || 'other') !== category) return false
            if (!needle) return true
            const haystack = [
              item.name,
              item.title,
              item.description && item.description.en,
              item.description && item.description.zh,
              item.category,
            ].filter(Boolean).join(' ').toLowerCase()
            return haystack.includes(needle)
          })
          matched.sort((a, b) => {
            if (sort === 'name') return String(a.title).localeCompare(String(b.title))
            const left = typeof a.stars === 'number' ? a.stars : null
            const right = typeof b.stars === 'number' ? b.stars : null
            if (left === null && right === null) return String(a.title).localeCompare(String(b.title))
            if (left === null) return 1
            if (right === null) return -1
            return sort === 'starsAsc' ? left - right : right - left
          })
          return matched
        }, [items, query, category, sort])

        const showInstall = typeof props.install === 'function'
        const installItem = (item) => {
          if (!showInstall) return
          props.install({ spec: item.name + '@' + item.version, title: item.title, version: item.version })
        }
        const copyItem = async (item) => {
          try {
            if (!navigator.clipboard || !navigator.clipboard.writeText) return
            await navigator.clipboard.writeText('dsh plugin add ' + item.name + '@' + item.version)
            setCopied(item.name)
          } catch {
            setCopied('')
          }
        }

        const shown = visible.slice(0, limit)
        const total = data ? data.total : null
        const topStar = items.length ? peak : null

        const searchIcon = h('svg', { viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' },
          h('circle', { cx: '7', cy: '7', r: '4.5', stroke: 'currentColor', 'stroke-width': '1.4' }),
          h('path', { d: 'M10.5 10.5L14 14', stroke: 'currentColor', 'stroke-width': '1.4', 'stroke-linecap': 'round' }),
        )

        return h('div', { className: 'das' },
          h('style', null, CSS),
          h('header', { className: 'das-hero' },
            h('div', { className: 'das-hero-body' },
              h('div', null,
                h('div', { className: 'das-kicker' }, t('kicker')),
                h('h2', { className: 'das-h' }, t('title') + ' ', h('em', null, t('titleAccent'))),
                h('p', { className: 'das-sub' },
                  t('subtitle', { n: total === null ? '…' : formatCount(total, language) })),
              ),
              h('div', { className: 'das-stats' },
                h('div', { className: 'das-stat' },
                  h('span', null, t('statPlugins')),
                  h('b', null, total === null ? '—' : formatCount(total, language))),
                h('div', { className: 'das-stat' },
                  h('span', null, t('statTop')),
                  h('b', null, topStar === null ? '—' : formatStars(topStar))),
                h('div', { className: 'das-stat' },
                  h('span', null, t('statUpdated')),
                  h('b', null, data && data.fetchedAt ? formatDate(data.fetchedAt, language, true) : '—')),
              ),
            ),
          ),
          h('div', { className: 'das-toolbar' },
            h('label', { className: 'das-search' },
              searchIcon,
              h('input', {
                type: 'search',
                value: query,
                placeholder: t('search'),
                'aria-label': t('search'),
                onChange: (event) => setQuery(event.target.value),
              }),
            ),
            h('div', { className: 'das-seg', role: 'group' },
              SORTS.map((key) => h('button', {
                key,
                type: 'button',
                'aria-pressed': sort === key,
                onClick: () => setSort(key),
              }, t(key === 'stars' ? 'sortStars' : key === 'starsAsc' ? 'sortStarsAsc' : 'sortName'))),
            ),
            h('button', {
              className: 'das-ghost',
              type: 'button',
              disabled: busy,
              onClick: () => { void load(true) },
            }, busy ? t('refreshing') : t('refresh')),
          ),
          categories.length
            ? h('div', { className: 'das-chips', role: 'group' },
              h('button', {
                type: 'button',
                'aria-pressed': category === 'all',
                onClick: () => setCategory('all'),
              }, t('all'), h('i', null, formatCount(items.length, language))),
              categories.map(([key, count]) => h('button', {
                key,
                type: 'button',
                'aria-pressed': category === key,
                onClick: () => setCategory(key),
              }, key, h('i', null, formatCount(count, language)))),
            )
            : null,
          notice
            ? h('p', { className: 'das-note' },
              t(notice.kind, { error: notice.kind === 'staleError' ? notice.error : '' }))
            : null,
          error
            ? h('div', { className: 'das-error' },
              h('span', null, t('errorDetail', { error })),
              h('button', { className: 'das-ghost', type: 'button', onClick: () => { void load(true) } }, t('retry')),
            )
            : null,
          loading
            ? h('div', { className: 'das-skels', 'aria-busy': 'true' },
              Array.from({ length: 7 }, (_, index) => h('div', { key: index, className: 'das-skel' })))
            : null,
          !loading && !error && visible.length === 0
            ? h('div', { className: 'das-empty' },
              h('b', null, t('empty')),
              h('span', null, t('emptyHint')))
            : null,
          !loading && visible.length
            ? h('ol', { className: 'das-list' },
              shown.map((item, index) => h(Row, {
                key: item.name,
                item,
                rank: index + 1,
                peak,
                language,
                t,
                open: openName === item.name,
                copied: copied === item.name,
                onToggle: () => setOpenName((value) => value === item.name ? '' : item.name),
                onInstall: () => installItem(item),
                onCopy: () => { void copyItem(item) },
              })))
            : null,
          visible.length > limit
            ? h('button', {
              className: 'das-ghost das-more',
              type: 'button',
              onClick: () => setLimit((value) => value + PAGE),
            }, t('more') + ' · ' + t('remaining', { n: visible.length - limit }))
            : null,
          data
            ? h('p', { className: 'das-foot' },
              h('span', null, t('foot', { n: formatCount(total, language) })),
              h('span', null, t('source') + (data.source ? ' · ' + data.source : '')))
            : null,
        )
      }

      // Take over the shipped catalog cell: same id, lower priority, so the
      // renderer elects this page for the 'discover' cell in place of the
      // market's own Discover section.
      ctx.slots.inject('plugins.tab', () => ctx.slots.register({
        name: 'plugins.tab',
        id: 'discover',
        order: 0,
        priority: -10,
        label: () => ctx.locale.bind(NS)('tab'),
        locale: NS,
      }, StarsTab))

      // The page builder lists raw ledger rows for its tab strip, so a shadowed
      // cell would otherwise show two identical tabs. Hide the replaced row from
      // that listing only; renderer election (entriesOfSlot) stays untouched.
      ctx.effect(() => {
        try {
          const ledger = ctx.slots.entries.bind(ctx.slots)
          const entries = (key) => {
            const rows = ledger(key)
            if (key !== 'plugins.tab') return rows
            return rows.filter((row) => row.component === StarsTab || row.options.id !== 'discover')
          }
          ctx.slots.entries = entries
          return () => {
            if (ctx.slots.entries === entries) delete ctx.slots.entries
          }
        } catch {
          // The tab still works; the page may just list both catalog rows.
          return undefined
        }
      }, 'awesome-stars: catalog tab')
    }

    return { inject: ['slots', 'locale'], apply }
  },
})
