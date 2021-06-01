// tests/cli.test.ts
import test from 'ava'
import { readCsv } from '../src/cli'

// demonstrate the callback test
test.cb(`It should able to read the csv and return the Array data row by row`, t => {
  t.plan(1)
  readCsv(() => {}, (rowCount: any) => {
    t.truthy(rowCount)
    t.end()
  })
})
