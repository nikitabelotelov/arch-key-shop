import {Document} from 'mongodb'

export interface IBoughtKey extends Document {
  ID: number
  UserID: number
  Key: string
  SoftwareID: number
}