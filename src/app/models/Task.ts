import { observable } from 'mobx';
import uuid from "uuid";
import { Statuses } from "./Statuses";

export class Task {
  readonly id: String;
  @observable public desc: string;
  @observable public status: Statuses;
  @observable public category: string;

  constructor(
    desc: string,
  ) {
    this.id = uuid.v4();
    this.desc = desc;
    this.category = '';
    this.status = Statuses.UNDONE;
  }
}

export default Task;
