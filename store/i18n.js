const LS_NAME = 'FDES_LANGUAGE'
const SET_LANG = 'set_lang'
export const state = () => ({
  info: {
    localStorageName: LS_NAME,
    languages: [
      { name: '简体中文', value: 'zh-CN' },
      { name: 'English', value: 'en-US' }
    ]
  },
  locales: ['en-US', 'zh-CN'],
  locale: window.localStorage.getItem(LS_NAME) || 'zh-CN'
})

export const mutations = {
  [SET_LANG] (state, locale) {
    if (state && state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const actions = {
  SetLang ({ commit }, locale) {
    if (locale) {
      commit(SET_LANG, locale)
    }
  }
}
