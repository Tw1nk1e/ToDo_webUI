import {gql} from "apollo-boost";

const GET_CATEGORIES = gql`
    query getCategories {
        getCategories {
            id
            name
        }
    }
`;

const ADD_CATEGORY = gql`
    mutation addCategory($name: String!){
        addCategory(name: $name) {
            id
        }
    }
`;

const DELETE_CATEGORY = gql`
    mutation deleteCategory($id: String!){
        deleteCategory(id: $id)
    }
`;

export { ADD_CATEGORY, GET_CATEGORIES, DELETE_CATEGORY }