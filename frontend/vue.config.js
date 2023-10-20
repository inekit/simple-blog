const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: '/',
  /*devServer: {
    https: true,
    public: 'localhost:443',
    host: '0.0.0.0',
    port: 443,
  },*/
  transpileDependencies: true,
});
