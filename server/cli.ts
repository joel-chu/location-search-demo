#!/usr/bin/env node
// mini cli tool
import readline from 'readline'
import { join } from 'path'

import { parse } from 'fast-csv'
import { createReadStream } from 'fs-extra'

import { prepareDb } from './src/model/create-table'
import { connect } from './src/model/connection'
import { LocationModel } from './src/model/location'

const importFile = join(__dirname, 'data', 'GB-partial.csv')

/**
 * map each row with a column name
 * @param {array} row
 * @return {*}
 */
function mapRow(row: Array<any>, initObj: any): any {
  const columns = [
    'geonameid',
    'name',
    'asciiname',
    'alternatenames',
    'latitude',
    'longitude',
    'initial' // special field
  ]

  return columns.map((col: string, i: number): any => {
    if (col === 'initial') {
      return [ col, row[1].substr(0, 1).toLowerCase() ]
    }
    return [ col, row[i] ]
  }).reduce((a: any, b: any): any => {
    let [ key, value ] = b
    a[key] = value
    return a
  }, initObj)
}


/**
 * Due to it's event based
 * we need to supply a callback to capture the data row by row
 *
 */
export function readCsv(cb: any): void {
  let ctn = 0
  createReadStream(importFile)
        .pipe(parse())
        .on('error', error => console.error(error))
        .on('data', row => {
          if (ctn > 0) {
            cb(row, ctn)
          }
          ++ctn
        })
        .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`))
}

/**
 * wrap everything in one call for the interface below
 *
 */
function runImport(): void {
  connect()
    .then(connection => {
      readCsv(async (row: any, i: number) => {
        const location = mapRow(row, new LocationModel())
        // let repo = connection.getRepository(location)
        await connection.manager.save(location)
        // await repo.save(location)
        console.log(`Record ${i} has been saved`)
      })
    })
}


// run it
if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('What do want to do? p(repare) or i(mport) ', (answer: string) => {
    switch (answer) {
      case 'p':
          prepareDb()
            .then(ctn => {
              if (ctn > 0) {
                console.log(`db table created`)
              } else {
                console.error(`something went wrong!`)
              }
            })
        break
      case 'i':
        runImport()
        break
      default:
        console.error(`Don't understand what you want ${answer}`)
    }
    rl.close()
  })
}
