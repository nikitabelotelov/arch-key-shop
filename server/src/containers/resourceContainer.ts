import { Db, MongoClient } from "mongodb";
import { IBoughtKey } from "../dataTypes/IBoughtKey";
import { IKey } from "../dataTypes/IKey";
import { ISoftware } from "../dataTypes/ISoftware";
import { BoughtKeys } from "../db/boughtKeys";
import { Keys } from "../db/keys";
import { Software } from "../db/software";

export class ResourceContainer {
  private database: Db
  public software: Software
  public keys: Keys
  public boughtKeys: BoughtKeys
  public async init() {
    const client = new MongoClient(process.env.DB_CONN_STRING)
    await client.connect()
    this.database = client.db(process.env.DB_NAME)
    this.software = new Software(this.database.collection<ISoftware>('Software'))
    this.keys = new Keys(client, this.database.collection<IKey>('Key'))
    this.boughtKeys = new BoughtKeys(this.database.collection<IBoughtKey>('BoughtKey'))
  }
}