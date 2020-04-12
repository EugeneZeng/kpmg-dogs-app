
const proxy = require("http-proxy-middleware");
 
// console.log(1);
module.exports = function(app) {
      app.use(
           proxy.createProxyMiddleware("/api", {
                 target: process.env.API_ENDPOINT,
                 changeOrigin: true,
                 pathRewrite: function (path, req) { return path.replace('/api', ''); }
           })
      );
}; 