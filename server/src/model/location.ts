// src/database/schema.ts
// typeorm scheme
/*
[
  'geonameid',
  'name',
  'asciiname',
  'alternatenames',
  'latitude',
  'longitude'
]
*/
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('location')

export class LocationModel {
  @PrimaryGeneratedColumn('increment')
  geonameid: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  asciiname: string

  @Column({ type: 'text' })
  alternatenames: string

  @Column({ type: 'double' })
  latitude: number

  @Column({ type: 'double' })
  longitude: number
  // this is an extra column I add for index
  // @TODO create a v-column instead?
  @Column({ type: 'text', length: 1})
  initial: string
}
