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
      id
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
      label
    }
  }
`;

export const BOOKS = gql`
  query Books {
    books {
      id
      title
      releaseYear
    }
  }
`;

export const YMBRYNES = gql`
query Query {
  ymbrynes {
    id
    name
    peculiarity {
      name
    }
  }
}
`