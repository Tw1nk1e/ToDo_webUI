import { observable } from 'mobx';
import uuid from "uuid";

export class Category {
  readonly id: string;
  @observable public name: string;

  constructor(
    name: string,
  ) {
    this.id = uuid.v4();
    this.name = name;
  }
}

export default Category;
