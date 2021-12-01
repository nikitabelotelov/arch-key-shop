import { Collection } from 'mongodb'
import { IKey } from '../dataTypes/IKey'

export class Keys {
  collection: Collection<IKey>
  constructor(collection: Collection<IKey>) {
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
}