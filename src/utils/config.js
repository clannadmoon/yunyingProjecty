/*
 * @Description: 这里输入文件功
 * @Author: zhoupeng
 * @Date: 2020-08-20 14:16:32
 */
module.exports = {
  siteName: '运营平台',
  copyright: '两两数智 ©2020 研发部',
  logoPath: '/logo.svg',
  apiPrefix: '/api/v1',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      // {
      //   key: 'pt-br',
      //   title: 'Português',
      //   flag: '/portugal.svg',
      // },
      // {
      //   key: 'en',
      //   title: 'English',
      //   flag: '/america.svg',
      // },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },
}
