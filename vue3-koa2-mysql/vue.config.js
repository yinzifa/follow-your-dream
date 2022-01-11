const path = require('path');

const proxyDomain = "http://10.12.0.138:9999";

module.exports = {
   publicPath: './',
   lintOnSave: false,
   crossorigin: "anonymous",
   runtimeCompiler: true,
   productionSourceMap: false,
   configureWebpack(config) {
      if (process.env.NODE_ENV === 'production') {
         // 为生产环境修改配置...
         console.log(config)
      } else {
         // 为开发环境修改配置...
      }
   },
   chainWebpack(config) {
      config.plugins.delete('prefetch');
      config.resolve.alias
         .set('components', path.join(__dirname, 'src/components'))
         .set('views', path.join(__dirname, 'src/views'))
         .set('assets', path.join(__dirname, 'src/assets'));
   },
   devServer: {
      host: 'localhost',
      port: 8088,
      open: true,
      proxy: {
         '/api': {
            target: proxyDomain,
            changeOrigin: true,
            secure: false,
            ws: true,
            pathRewrite: {
               '^/api': ''
            }
         }
      },
      overlay: {
         warnings: false,
         errors: false
      }
   }
}
