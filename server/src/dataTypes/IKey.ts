import {Document} from 'mongodb'

export interface IKey extends Document {
  ID: number
  Key: string
  SoftwareID: number
}