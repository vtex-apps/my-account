export default {
  routes: {
    enabled: ctx => {
      ctx.response.status = 204
      ctx.response.body = 'My Account app is installed in this Store.'
    },
  },
}
