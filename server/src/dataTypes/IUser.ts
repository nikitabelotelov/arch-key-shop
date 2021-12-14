import { Document } from 'mongodb'

export interface IUser extends Document {
  Login: string
  Hash: string
  ID: number
}