import { Collection, MongoClient } from 'mongodb'
import { IKey } from '../dataTypes/IKey'

export class Keys {
  client: MongoClient
  collection: Collection<IKey>
  constructor(client: MongoClient, collection: Collection<IKey>) {
    this.client = client;
    this.collection = collection;
  }
  async fetchKeys(keys: number[]): Promise<IKey[]> {
    return await this.collection.find({ ID: { $all: keys } }).toArray()
  }
  async removeKeys(keys: number[]): Promise<boolean> {
    const res = await this.collection.deleteMany({ ID: { $all: [keys] } })
    if(res.deletedCount === keys.length) {
      return true
    } else {
      console.error("Couldn't delete keys")
      return false
    }
  }
  async bookKeysForSoftware(ids: number[]): Promise<IKey[]> {
    const session = this.client.startSession()
    try {
      const res = await session.withTransaction(async () => {
        const fetchedKeys = await this.fetchKeys(ids)
        await this.removeKeys(ids)
        return fetchedKeys
      })
      return res
    } catch(e) {
      console.error("Error during booking keys", e)
    } finally {
      session.endSession()
    }
  }
}