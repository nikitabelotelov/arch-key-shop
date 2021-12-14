import { Collection } from 'mongodb'
import { IUser } from '../dataTypes/IUser'
import md5 from 'md5'

interface Credentials {
  username: string
  password: string
}

export class User {
  collection: Collection<IUser>
  constructor(collection: Collection<IUser>) {
    this.collection = collection;
  }
  async fetchUser(credentials: Credentials): Promise<IUser | null> {
    return await this.collection.findOne({
      Login: credentials.username,
      Hash: md5(credentials.password)
    })
  }
}