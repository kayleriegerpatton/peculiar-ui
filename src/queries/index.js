import { gql } from "@apollo/client";

export const CHARACTERS = gql`
  query Query {
    characters {
      id
      name
    }
  }
`;

export const PECULIARITIES = gql`
  query Peculiarities {
    peculiarities {
      name
      abilities
    }
  }
`;

export const LOOPS = gql`
  query Loops {
    loops {
      id
      city
      year
    }
  }
`;
