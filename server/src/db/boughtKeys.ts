import { Collection } from 'mongodb'
import { IBoughtKey } from '../dataTypes/IBoughtKey';

export class BoughtKeys {
  collection: Collection<IBoughtKey>
  constructor(collection: Collection<IBoughtKey>) {
    this.collection = collection;
  }
  async addKeys(keys: IBoughtKey[]): Promise<boolean> {
    const res = await this.collection.insertMany(keys)
    if (res.insertedCount === keys.length) {
      return true
    } else {
      console.error("Couldn't insert bought keys")
      return false
    }
  }
  async fetchBoughtKeys(userId: number): Promise<IBoughtKey[]> {
    return await this.collection.find({ UserID: userId }).toArray()
  }
}