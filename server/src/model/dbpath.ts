
import { join } from "path"

const baseDir = join(__dirname, '..', '..', 'data')

export const dbpath = join(baseDir, 'location-search-demo.db')

export const csvFile = join(baseDir, 'GB-partial.csv')
