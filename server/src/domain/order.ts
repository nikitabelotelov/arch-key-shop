import { IBoughtKey } from "../dataTypes/IBoughtKey";
import { IKey } from "../dataTypes/IKey";
import { BoughtKeys } from "../db/boughtKeys";
import { Keys } from "../db/keys";
import { proceedPayment } from "./paymentService";

export class Order {
  resources: { keys: Keys, boughtKeys: BoughtKeys }
  constructor(keys: Keys, boughtKeys: BoughtKeys) {
    this.resources = {
      keys, boughtKeys
    }
  }
  public async orderKeys(userId: number, keys: number[]): Promise<IBoughtKey[]> {
    const res = await proceedPayment()
    // TODO Should work with software id's instead of key id's
    if (res === true) {
      const keysInfo = await this.resources.keys.fetchKeys(keys)
      await this.resources.keys.removeKeys(keys)
      const boughtKeys = keysInfo.map((el) => ({ ...el, UserID: userId }))
      await this.resources.boughtKeys.addKeys(boughtKeys)
      return boughtKeys
    }
  }
}