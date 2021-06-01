// preact.config.js
// need to proxy back to our Koa setup
module.exports = function(config) {
  if (config.devServer) {
    const port = process.env.PORT || 3388

    config.devServer.proxy = [
      {
        // proxy requests matching a pattern:
        path: '/locations/**',
        // where to proxy to:
        target: `http://localhost:${port}/locations`,
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
    ]
  }
}
