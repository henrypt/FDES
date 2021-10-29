import jsCookie from 'js-cookie'
// import { calendarFormat } from 'moment'

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const defaultLocale = app.i18n.fallbackLocale
  // If middleware is called from hot module replacement, ignore it
  window.console && window.console.log('middleware/i18n.js => isHMR = ' + isHMR)
  if (isHMR) {
    return
  }
  // const defaultLocale = jsCookie.get(SITE_LANGUAGE) || app.i18n.fallbackLocale
  /*
    修改pages文件夹下相应的页面
    在pages文件夹下新建_lang文件夹，之后在此文件夹下新建对应的页面组件。
    例如：
      @/pages/_lang/index.vue
      @/pages/_lang/about.vue
    一定要带下划线的_lang，否则params.lang,获取不到值。可以参考官网这里

    <template >
      <div> {{ $t('home.title') }}</div>
    </template>
    页面中的需要翻译的内容,都使用语法$t('')给包裹起来，其中里面的值，是从@/locales/***.json文件中获取对应的key。
  */

  const SITE_LANGUAGE = store.state.i18n
    ? store.state.i18n.info.localStorageName
    : 'FDES_LANGUAGE'
  // Get locale from params
  const locale =
    jsCookie.get(SITE_LANGUAGE) ||
    window.localStorage.getItem(SITE_LANGUAGE) ||
    params.lang ||
    defaultLocale

  // const locale1 = jsCookie.get(SITE_LANGUAGE) || params.lang || defaultLocale
  if (store.state.i18n) {
    if (!store.state.i18n.locales.includes(locale)) {
      return error({
        message: 'This page could not be found.',
        statusCode: 404
      })
    }
  }

  // Set locale store/modules/i18n.js [ using commit => mutations ]
  store.dispatch('i18n/SetLang', locale)
  // store.commit('i18n/SET_LANG', locale)

  // 初始化基本菜单
  const dataMenu = app.i18n.messages[locale].menuClass1
  store.dispatch('menu/InitMenu', { info: dataMenu.data })
  // store.commit('menu/InitMenu', { info: dataMenu.data })

  if (store.state.i18n) {
    app.i18n.locale = store.state.i18n.locale
  }

  jsCookie.set(SITE_LANGUAGE, locale)
  window.localStorage.setItem(SITE_LANGUAGE, locale)

  // If route is /<defaultLocale>/... -> redirect to /...
  if (
    locale === defaultLocale &&
    route.fullPath.indexOf('/' + defaultLocale) === 0
  ) {
    const toReplace = '^/' + defaultLocale
    const re = new RegExp(toReplace)
    return redirect(route.fullPath.replace(re, '/'))
  }
}
