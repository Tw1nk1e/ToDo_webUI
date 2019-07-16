import {action, observable, runInAction} from 'mobx';
import Task from "../../models/Task";
import { changeStatus, createTask, getTasks, removeTask } from "../../services/TaskService/TaskService";

export class TaskStore {

  @observable isLoading: boolean = false;
  @observable tasks: Task[] = [];

  @action add = (desc: string, category: string) => {
    this.isLoading = true;
    return createTask(desc, category)
      .then(() => runInAction(() => {
        this.loadTasks();
        this.isLoading = false;
      }))
  };

  @action loadTasks = () => {
    this.isLoading = true;
    return getTasks()
      .then((response) => runInAction(() => {
        this.tasks = response.getTasks;
        this.isLoading = false;
        return this.tasks;
      }))
  };

  @action changeTaskStatus = (id: String) => {
    this.isLoading = true;
    return changeStatus(id)
      .then((response: any) => runInAction(() => {
        this.loadTasks();
        this.isLoading = false;
        return response;
      }))
  };

  @action deleteTask = (id: String) => {
    this.isLoading = true;
    return removeTask(id)
      .then(() => runInAction(() => {
        this.loadTasks();
        this.isLoading = false;
      }))
  };
}



export default new TaskStore();