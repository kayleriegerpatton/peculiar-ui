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
