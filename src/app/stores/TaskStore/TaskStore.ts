import {action, observable, runInAction} from 'mobx';
import Task from "../../models/Task";
import {
  removeTask,
  createTask,
  changeStatus,
  getTasksByCategory
} from "../../services/TaskService/TaskService";

export class TaskStore {

  @observable isLoading: boolean = false;
  @observable tasks: Task[] = [];

  @action add = (desc: string, category: string) => {
    this.isLoading = true;
    return createTask(desc, category)
      .then(() => runInAction(() => {
        this.loadTasksByCategory(category);
        this.isLoading = false;
      }))
  };

  @action loadTasksByCategory = (id: string) => {
    this.isLoading = true;
    return getTasksByCategory(id)
      .then((response) => runInAction(() => {
        this.tasks = response.getTasksByCategory;
        this.isLoading = false;
      }))
  };

  @action changeTaskStatus = (task: Task) => {
    this.isLoading = true;
    return changeStatus(task.id)
      .then(() => runInAction(() => {
        this.loadTasksByCategory(task.category);
        this.isLoading = false;
      }))
  };

  @action deleteTask = (task: Task) => {
    this.isLoading = true;
    return removeTask(task.id)
      .then(() => runInAction(() => {
        this.loadTasksByCategory(task.category);
        this.isLoading = false;
      }))
  };
}

export default new TaskStore();