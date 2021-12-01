import { Catalog } from "../domain/catalog";
import { Order } from "../domain/order";
import { ResourceContainer } from "./resourceContainer";

export class ServiceContainer {
  resources: ResourceContainer
  order: Order
  catalog: Catalog
  constructor(resorces: ResourceContainer) {
    this.resources = resorces;
    this.catalog = new Catalog(this.resources.software)
    this.order = new Order(this.resources.keys, this.resources.boughtKeys)
  }
}