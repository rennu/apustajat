const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    '/sammakot',
    createProxyMiddleware({
      target: 'https://nobully.zone:3001',
      changeOrigin: true
    })
  )
}
