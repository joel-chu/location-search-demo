// tests/model.test.ts

import test from 'ava'

import { connect } from '../src/model/connection'
import { connectDb, createTable, dropTable, tableExist, closeDb } from '../src/model/create-table'

test.before(() => {
  connectDb()
  createTable()
})

test.after(() => {
  dropTable()
  closeDb()
})


test(`Should able to create table`, async t => {
  const result = await tableExist(`location`)
  t.is(result[0].ctn, 1, 'we expect the table return one')
})

// demonstrate how to deal with Promise result without async
test(`Should able to connect to the sqlite database via typeorgm`, t => {
  return connect()
    .then(connection => {
      t.truthy(connection)
    })
})
