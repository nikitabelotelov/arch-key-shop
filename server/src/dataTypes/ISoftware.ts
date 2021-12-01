import { Document } from 'mongodb'

export interface ISoftware extends Document {
  Name: string
  Description: string
  ID: number
}