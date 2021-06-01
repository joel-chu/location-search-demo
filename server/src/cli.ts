// server/src/cli.ts
// move part of the cli code here, ts is screwing up the path AGAIN?
import { join } from 'path'

import { parse } from 'fast-csv'
import { createReadStream } from 'fs-extra'


import { connect } from './model/connection'
import { LocationModel } from './model/location'

const importFile = join(__dirname, '..' ,'data', 'GB-partial.csv')

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
      // use the asciiname instead
      return [ col, row[2].substr(0, 1).toLowerCase() ]
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
 * @param {function} cb callback to handle the data
 * @param {function} finalCb? optional callback for testing purpose
 * @return {void}
 * @public
 */
export function readCsv(cb: any, finalCb?: any): void {
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
        .on('end', (rowCount: number) => {
          if (finalCb && typeof finalCb === 'function') {
            finalCb(rowCount)
          }
          console.log(`Parsed ${rowCount} rows`)
        })
}

/**
 * wrap everything in one call for the interface below
 * @return {void}
 * @public
 */
export function runImport(): void {
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
