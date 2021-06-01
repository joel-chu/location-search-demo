// src/router.ts
// sample router template
import Koa from 'koa'
import Router from 'koa-router'

const routerOpts: Router.IRouterOptions = {
  prefix: '/query',
}

const router: Router = new Router(routerOpts)

// just take what you need
router.get('/', async (ctx:Koa.Context) => {
  ctx.body = 'Hello world'
})

router.post('/:param', async (ctx:Koa.Context) => {
  ctx.body = 'POST'
})


export default router
