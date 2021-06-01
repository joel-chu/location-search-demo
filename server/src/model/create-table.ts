// server/src/model/create-table.ts

// create the table structure manually, not using the typeorm migration
// there is no point to have the whole setup for just one table

import sqlite3 from 'sqlite3'
import { dbpath } from './dbpath'

let db: any = null

/**
 * putthing everything together for the cli to use
 * @param {Promise<any>}
 */
export async function prepareDb(): Promise<any> {
  connectDb()
  dropTable()
  createTable()

  return tableExist('location')
    .then(result => {
      closeDb()
      return result[0].ctn
    })
}

/**
 * wrap the connection call
 * @return {void}
 */
export function connectDb(): void {
  if (db === null) {
    const isTest = process.env.NODE_ENV === 'test'
    const dbPathReal = isTest ? dbpath.replace('.db', '.test.db') : dbpath

    db = new sqlite3.Database(dbPathReal)
  }
}

/**
 * run the create sql
 * @return {void}
 */
export function createTable(): void {
  const sql = `
    CREATE TABLE IF NOT EXISTS
    location (
      geonameid INT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      asciiname TEXT,
      alternatenames TEXT,
      latitude REAL,
      longitude REAL,
      initial TEXT
    )
  `
  db.run(sql)
}

/**
 * this is for testing ONLY
 * @return {void}
 */
export function dropTable(): void {
  const sql = `DROP TABLE IF EXISTS location `
  db.run(sql)
}

/**
 * Check if the table exist or not for testing ONLY
 * @param {string} tableName
 * @return {Promise<any>} Error | row
 */
export async function tableExist(tableName: string): Promise<any> {
  return new Promise((resolver, rejecter) => {
    const sql = `
      SELECT count(*) AS ctn FROM sqlite_master WHERE type='table' AND name='${tableName}'
    `
    db.all(sql, (err: Error, row: any[]) => {
      if (err) {
        return rejecter(err)
      }
      return resolver(row)
    })
  })
}

/**
 * close the db connetion
 * @return {void}
 */
export function closeDb(): void {
  if (db !== null) {
    db.close()
    db = null
  }
}
