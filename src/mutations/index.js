import { gql } from "@apollo/client";

export const CREATE_CHARACTER = gql`
  mutation Mutation($input: CharacterInput!) {
    createCharacter(input: $input) {
      name
      species
      imageUrl
      homeLoop {
        id
      }
      peculiarity {
        name
      }
      books {
        id
      }
      status
    }
  }
`;

export const CREATE_PECULIARITY = gql`
mutation Mutation($input: PeculiarityInput!) {
  createPeculiarity(input: $input) {
    name
  }
}
`

export const CREATE_LOOP = gql`
mutation Mutation($input: LoopInput!) {
  createLoop(input: $input) {
    id
  }
}
`

export const CREATE_USER = gql`
mutation Mutation($input: CreateUserInput!) {
  signupUser(input: $input) {
    success
  }
}
`

export const LOGIN_USER = gql`
mutation Mutation($input: LoginInput!) {
  loginUser(input: $input) {
    token
    user {
      createdCharacters {
        name
      }
      email
      firstName
      id
      lastName
      profileImage
      savedCharacters {
        name
      }
      username
    }
  }
}
`