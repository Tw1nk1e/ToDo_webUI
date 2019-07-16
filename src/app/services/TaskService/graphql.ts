import {gql} from "apollo-boost";

const GET_TASKS = gql`
    query GetTasks {
        getTasks {
            id
            desc
            status
            category
        }
    }
`;

const ADD_TASK = gql`
    mutation addTask($desc: String!, $category: String!){
        addTask(desc: $desc, category: $category) {
            id
        }
    }
`;

const CHANGE_STATUS = gql`
    mutation changeTaskStatus($id: String!){
        changeTaskStatus(id: $id)
    }
`;

const DELETE_STATUS = gql`
    mutation deleteTask($id: String!){
        deleteTask(id: $id)
    }
`;

export { GET_TASKS, CHANGE_STATUS, ADD_TASK, DELETE_STATUS }