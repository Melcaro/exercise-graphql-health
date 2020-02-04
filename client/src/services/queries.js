import { gql } from 'apollo-boost';

export const allUsersQuery = gql`
  {
    users {
      id
      name
      age
    }
  }
`;

export const UserQuery = gql`
  {
    user {
      id
      name
      age
      weight {
        weight
        date
      }
      tension {
        tension
        date
      }
      waterConsumption {
        glassofwaterdrunk
        date
      }
      exercices {
        exercicetype
        exerciceduration
        date
      }
    }
  }
`;
