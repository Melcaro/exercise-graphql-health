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
  query($id: ID) {
    user(id: $id) {
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

export const updateQuery = gql`
  mutation(
    $userID: ID
    $weight: Int
    $tension: Int
    $glassofwaterdrunk: Int
    $exercicetype: String
    $exerciceduration: Int
    $date: String
  ) {
    updateWeight(userID: $userID, weight: $weight, date: $date) {
      user_id
      weight
      date
    }
    updateTension(userID: $userID, tension: $tension, date: $date) {
      user_id
      tension
      date
    }
    updateDrinkConsumption(
      userID: $userID
      glassofwaterdrunk: $glassofwaterdrunk
      date: $date
    ) {
      user_id
      glassofwaterdrunk
      date
    }
    updateExercices(
      userID: $userID
      exercicetype: $exercicetype
      exerciceduration: $exerciceduration
      date: $date
    ) {
      user_id
      exercicetype
      exerciceduration
      date
    }
  }
`;
