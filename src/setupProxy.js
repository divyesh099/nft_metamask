const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/regular-metadata',
    createProxyMiddleware({
      target: 'https://nft-json-deta.fra1.digitaloceanspaces.com',
      changeOrigin: true,
    })
  );
};
