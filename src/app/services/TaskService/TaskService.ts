import { client } from "../ClientService";
import { GET_TASKS, CHANGE_STATUS, ADD_TASK, DELETE_STATUS } from './graphql'

export const getTasks = () => {
    return client
    .query({ query: GET_TASKS }).then((promise) => {
      return promise.data
    })
};

export const changeStatus = (id: String) => {
  return client
    .mutate({ mutation: CHANGE_STATUS, variables: { id }})
    .then((promise) => {
      client.cache.reset();
      return promise.data
    })
};

export const createTask = (desc: String, category: string) => {
  return client
    .mutate({ mutation: ADD_TASK , variables: { desc, category }})
    .then((promise) => {
      client.cache.reset();
      return promise.data
    })
};

export const removeTask = (id: String) => {
  return client
    .mutate({ mutation: DELETE_STATUS, variables: { id }})
    .then((promise) => {
      client.cache.reset();
      return promise.data
    })
};
