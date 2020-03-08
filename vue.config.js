const path = require('path');

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

module.exports = {
  lintOnSave: false,
  outputDir: 'dist',
  publicPath: '/',
  productionSourceMap: false, // 设置上线后是否加载webpack文件
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        prependData: '@import "~@/style/common.sass"',
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `data` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: '@import "~@/style/common.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all',
    });
    // svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
  configureWebpack: (config) => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@component': path.resolve(__dirname, './src/components'),
          '@utils': path.resolve(__dirname, './src/utils'),
          '@views': path.resolve(__dirname, './src/views'),
          '@api': path.resolve(__dirname, './src/api'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@modules': path.resolve(__dirname, './src/store/modules'),
        },
      },
    });
  },
  // 修改favicon.ico
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
  /*  devServer: {
    // 设置主机地址
    // host: 'localhost',
    // // 设置默认端口
    // port: 8080,
    // 设置代理
    proxy: {
      '/api': {
        // 目标 API 地址
        target: 'http://49.233.183.51:8080/jeeplus',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: { // 路径重写，
          '^/api': '', // 替换target中的请求地址
        },
      },
    },
  }, */
  devServer: {
    host: '0.0.0.0',
    port: 8083,
    disableHostCheck: true,
  },
};
