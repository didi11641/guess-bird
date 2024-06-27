const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 支持所有路径下的跨域请求
  app.use(
    '/audio',
    createProxyMiddleware({
      target: 'https://xeno-canto.org',
      changeOrigin: true,
      pathRewrite: { '^/audio': '' },
      onProxyReq: (proxyReq, req, res) => {
        // 设置允许跨域的 CORS 策略
        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
        proxyReq.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        proxyReq.setHeader('Access-Control-Allow-Headers', 'content-type');
      }
    })
  );
};