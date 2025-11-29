// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: '.',
  modules: [
    '@nuxtjs/tailwindcss',
    '@unocss/nuxt'
  ],
  app: {
    head: {
      title: 'Jiuxina の 空间',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      // 引入 APlayer 和 MetingJS 的样式与脚本
      link: [
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js', defer: true }
      ]
    }
  },
  vue: {
    compilerOptions: {
      // 告诉 Vue：meting-js 是自定义标签，不要报错
      isCustomElement: (tag) => tag === 'meting-js'
    }
  },
  unocss: {
    uno: true,
    icons: true,
  }
})