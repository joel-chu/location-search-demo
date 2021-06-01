// src/router.ts
// sample router template
import { join } from 'path'

import Koa from 'koa'
import Router from 'koa-router'
import marked from 'marked'
import { readFileSync } from 'fs-extra'

import { connect } from './model/connection'
import { LocationModel } from './model/location'

const routerOpts: Router.IRouterOptions = {
  prefix: '/query',
}

const router: Router = new Router(routerOpts)

// stock placeholder
router.get('/', async (ctx:Koa.Context) => {
  ctx.body = 'Hello world'
})
// just sneak one in here to return the readme for the about page
router.get('/about-me', async (ctx: Koa.Context) => {
  const readme = readFileSync(join(__dirname, '..', '..', 'README.md'), {encoding: 'utf8'})
  ctx.body = marked(readme)
})
// finally the search method
router.post('/:searchTerm', async (ctx:Koa.Context) => {
  const conn = await connect()
  const result = await conn
                  .getRepository(LocationModel)
                  .createQueryBuilder("location")
                  .where("location.asciiname like :term", { term:`${ctx.params.searchTerm}%` })
                  .getMany()
  // @NOTE there are whole lot more to do here like searching alternative field if there is none record return
  // etc etc etc

  ctx.body = result
})


export default router
