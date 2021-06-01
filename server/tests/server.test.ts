// tests/server.test.tpl
import test from 'ava'
import supertest from 'supertest'
import app from '../src/app'

function listen(): any {
  return supertest(app.listen())
}

test.cb(`Should not be able to query if the q is less than 2 characters`, t => {
  listen()
    .get('/locations?q=x')
    .expect(400, () => {
      t.pass()
      t.end()
    })
})


test.cb(`It should able to return search result`, t => {
  listen()
    .get('/locations?q=woo')
    .expect(200, function(err: Error, res: any) {
      if (err) {
        console.error(err)
        t.fail()
      }
      t.truthy(res.text)
      t.end()
    })
})
