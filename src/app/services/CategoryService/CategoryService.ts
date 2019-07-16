import { client } from "../ClientService";
import {ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES} from "./graphql";

export const getCategories = () => {
    return client
    .query({ query: GET_CATEGORIES }).then((promise) => {
      return promise.data
    })
};

export const createCategory = (name: String) => {
    return client
      .mutate({ mutation: ADD_CATEGORY , variables: { name }})
      .then((promise) => {
          client.cache.reset();
          return promise.data
      })
};

export const deleteCategory = (id: String) => {
    return client
      .mutate({ mutation: DELETE_CATEGORY , variables: { id }})
      .then((promise) => {
          client.cache.reset();
          return promise.data
      })
};