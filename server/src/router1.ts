// server/src/router1.ts
// this is answer to the question 1
import Koa from 'koa'
import Router from 'koa-router'

import { connect } from './model/connection'
import { LocationModel } from './model/location'

const routerOpts: Router.IRouterOptions = {
  prefix: '/locations',
}

const router: Router = new Router(routerOpts)
// there is no need to give it a wildcard
router.get('/', async (ctx:Koa.Context, next: any) => {

  const query = ctx.query.q
  if (query && query.length > 1) {
    const conn = await connect()
    const result = await conn
                    .getRepository(LocationModel)
                    .createQueryBuilder("location")
                    .where("location.asciiname like :term", { term:`${query}%` })
                    .getMany()
    // return
    ctx.body = result.map(r => r.asciiname)
  } else {
    // just fail it
    await next()
    ctx.response.status = 400
  }
})


export default router
