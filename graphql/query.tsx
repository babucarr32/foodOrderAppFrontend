import { gql } from "@apollo/client";

export const GET_USER = gql`
  query ExampleQuery($id: String) {
    user(ID: $id) {
      username
      password
      id
      currentChoice
      favorites {
        foodName
        food_id
      }
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      currentChoice
      password
      username
      id
      favorites {
        foodName
        food_id
      }
    }
  }
`;

export const GET_FOODS = gql`
  query Query {
    foods {
      id
      name
    }
  }
`;

export const ADD_TO_FAV = gql`
  mutation Mutation($info: AddToFavorites) {
    addToFavorites(info: $info) {
      currentChoice
      id
      password
      username
      favorites {
        foodName
        id
      }
    }
  }
`;

export const REMOVE_FROM_Fav = gql`
  mutation RemoveFromFavorites($info: RemoveFromFavorites) {
    removeFromFavorites(info: $info) {
      id
      username
      password
      currentChoice
      favorites {
        foodName
        id
      }
    }
  }
`;

export const MAKE_ORDER = gql`
  mutation Mutation($info: MakeOrder) {
    makeOrder(info: $info) {
      id
      username
      password
      currentChoice
      favorites {
        food_id
        id
        foodName
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($credentials: Login) {
    login(credentials: $credentials) {
      username
      currentChoice
      favorites {
        foodName
        food_id
      }
      accessToken
      id
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation Mutation($credentials: CreateAccount) {
    createAccount(credentials: $credentials) {
      id
      username
      currentChoice
      favorites {
        foodName
        id
      }
      accessToken
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyJWTToken($token: String) {
    verifyJWTToken(token: $token)
  }
`;

export const EDIT_USER = gql`
  mutation Mutation($credentials: EditAccount) {
    editAccount(credentials: $credentials) {
      id
      username
      password
      currentChoice
      favorites {
        id
        food_id
        foodName
      }
    }
  }
`;
