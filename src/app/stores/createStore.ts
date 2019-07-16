import {CATEGORY_STORE, TASK_STORE,} from "../constants/stores";
import taskStore from "./TaskStore/TaskStore";
import CategoryStore from "./CategoryStore/CategoryStore";

export function createStores() {
  return {
    [TASK_STORE]: taskStore,
    [CATEGORY_STORE]: CategoryStore,
  };
}
