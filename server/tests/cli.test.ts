// tests/cli.test.ts
import test from 'ava'
import { readCsv } from '../cli'

// demonstrate the callback test
test.cb.skip(`It should able to read the csv and return the Array data row by row`, t => {
  const planned = 3
  t.plan(planned) // note here we plan 3 tests
  let ctn = 0
  readCsv(row => {

    if (ctn >= planned) {
      t.end()
    }

    t.true(Array.isArray(row))
    ++ctn

  })
})
