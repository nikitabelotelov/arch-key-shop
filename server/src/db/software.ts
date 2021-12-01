import { Collection } from 'mongodb'
import { ISoftware } from '../dataTypes/ISoftware'

export class Software {
  collection: Collection<ISoftware>
  constructor(collection: Collection<ISoftware>) {
    this.collection = collection;
  }
  async fetchSoftware(): Promise<ISoftware[]> {
    return await this.collection.find({}).toArray()
  }
}