// preact.config.js
// need to proxy back to our Koa setup
module.exports = function(config) {
  config.devServer.proxy = [
    {
      // proxy requests matching a pattern:
      path: '/query/**',
      // where to proxy to:
      target: 'http://localhost:3388/query',
      // optionally change Origin: and Host: headers to match target:
      changeOrigin: true,
      changeHost: true,

      // optionally mutate request before proxying:
      pathRewrite: function(path, req) {
        // you can modify the outbound proxy request here:
        delete req.headers.referer;

        // common: remove first path segment: (/api/**)
        return '/' + path.replace(/^\/[^\/]+\//, '');
      },

      // optionally mutate proxy response:
      onProxyRes: function(proxyRes, req, res) {
        // you can modify the response here:
        proxyRes.headers.connection = 'keep-alive';
        proxyRes.headers['cache-control'] = 'no-cache';
      }
    }
  ];
};