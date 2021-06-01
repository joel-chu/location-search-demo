// src/model/connection.ts
// for TypeORM
import "reflect-metadata"

import { createConnection } from "typeorm"
import { LocationModel } from "./location"
import { dbpath } from './dbpath'

const logging = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev'

/**
 * We wrap this into a function not calling it at start
 *
 */
export function connect(): Promise<any> {
  return createConnection({
    type: "sqlite",
    database: dbpath,
    entities: [
      LocationModel
    ],
    logging: logging
  })
}
