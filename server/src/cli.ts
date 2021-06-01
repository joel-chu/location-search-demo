// server/src/cli.ts
// move part of the cli code here, ts is screwing up the path AGAIN?
import { parse } from 'fast-csv'
import { createReadStream } from 'fs-extra'

import { csvFile } from './model/dbpath'
import { connect } from './model/connection'
import { LocationModel } from './model/location'

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
    'initial' // special field for our own fun game later
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
  createReadStream(csvFile)
        .pipe(parse())
        .on('error', error => console.error(error)) // should re-use the finalCb as errorHandler as well
        .on('data', row => {
          if (ctn > 0) { // skip the header
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
        await connection.manager.save(location)
        // different way to do the same thing
        // let repo = connection.getRepository(location)
        // await repo.save(location)
        console.log(`Record ${i} saved`)
      })
    })
}
