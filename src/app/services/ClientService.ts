import ApolloClient, { InMemoryCache } from "apollo-boost";
import {API} from "../constants/constants";

export const client = new ApolloClient({
  uri: API,
  cache: new InMemoryCache()
});