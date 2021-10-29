// import Router from 'koa-router'
const Router = require('koa-router')

const router = new Router({
  prefix: '/user'
})

// eslint-disable-next-line require-await
router.get('/token', async (ctx) => {
  ctx.body = {
    code: 200,
    val:
      'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJuaW5naGFvLm5ldCIsImV4cCI6IjE0Mzg5NTU0NDUiLCJuYW1lIjoid2FuZ2hhbyIsImFkbWluIjp0cnVlfQ.SwyHTEx_RQppr97g4J5lKXtabJecpejuef8AqKYMAJc'
  }
})

module.exports = router
