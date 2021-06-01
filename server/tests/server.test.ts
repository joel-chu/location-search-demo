// tests/server.test.tpl
import test from 'ava'
import supertest from 'supertest'
import app from '../src/app'

function listen(): any {
  return supertest(app.listen())
}


test.cb(`It should able to connect to the koa server`, t => {
  listen()
    .get("/query")
    .expect(200, function (err: Error, res: any) {
      if (err) {
        console.error(err)
        t.fail()
      }
      t.is(res.text, 'Hello world', 'res.text == Hello world')
      t.end()
    })
})

test.cb(`It should able to open the readme page`, t => {
  listen()
    .get('/query/about-me')
    .expect(200, function(err: Error, res: any) {
      if (err) {
        console.error(err)
        t.fail()
      }
      t.truthy(res.text.indexOf('location search demo'))
      t.end()
    })
})


test.cb(`It should able to return search result`, t => {
  listen()
    .post('/query/woo')
    .expect(200, function(err: Error, res: any) {
      if (err) {
        console.error(err)
        t.fail()
      }
      t.truthy(res.text)
      t.end()
    })
})
