const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'com.thinreports.section-editor',
        publish: null,
        mac: {
          artifactName: '${productName}-${version}-darwin.${ext}',
          category: 'public.app-category.developer-tools',
          darkModeSupport: false,
          icon: 'build/icon.icns'
        },
        linux: {
          artifactName: '${productName}-${version}-linux.${ext}',
          category: 'Development',
          target: 'AppImage'
        },
        win: {
          artifactName: '${productName}-${version}-win32.${ext}',
          icon: 'build/icon.ico'
        }
      },
      nodeIntegration: true
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'ja',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  configureWebpack: {
    target: 'electron-main'
  }
});
