const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/chatService',
    createProxyMiddleware({
      target: 'https://chat-service-lost-n-found.herokuapp.com',
      changeOrigin: true,
      pathRewrite: { '^/chatService': '' },
    })
  );

  app.use(
    '/userService',
    createProxyMiddleware({
      target: 'https://taip-users-service.herokuapp.com',
      changeOrigin: true,
      pathRewrite: { '^/userService': '' },
    })
  );

  app.use(
    '/postService',
    createProxyMiddleware({
      target: 'https://posts-service-ip.herokuapp.com',
      changeOrigin: true,
      pathRewrite: { '^/postService': '' },
    })
  );

  app.use(
    '/photoService',
    createProxyMiddleware({
      target: 'https://cosaft-simp.herokuapp.com/api/v2',
      changeOrigin: true,
      pathRewrite: { '^/photoService': '' },
    })
  );
};
