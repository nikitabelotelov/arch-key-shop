import { Document } from 'mongodb'

export interface IKey extends Document {
  Login: string
  token: string
  ID: number
}