import { ISoftware } from "../dataTypes/ISoftware";
import { Software } from "../db/software";

export class Catalog {
  resources: { software: Software }
  constructor(software: Software) {
    this.resources = {
      software
    }
  }
  public async fetchSoftware(): Promise<ISoftware[]> {
    return this.resources.software.fetchSoftware()
  }
}