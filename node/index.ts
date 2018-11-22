/* This is necessary for sustaining compatibility with the environment `vtexcommerce`.
  It checks if the app is installed or not through this endpoint. DO NOT REMOVE IT! */

export default {
  routes: {
    enabled: ctx => {
      ctx.response.status = 204
      ctx.response.body = 'My Account app is installed in this Store.'
    },
  },
}
