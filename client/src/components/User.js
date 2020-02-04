import React from 'react';
import { graphql } from 'react-apollo';
import { UserQuery } from '../services/queries';

// id,
//   name,
//   age,
//   weight,
//   tension,
//   waterConsumption,
//   exercices,

export const User = props => {
  console.log(props);
  return (
    <div>USER PAGE</div>
    /* <div>
      <div key={id}>
        <h3>{name}</h3>
        <div>Age: {age} yo</div>

        <h4>WEIGHT</h4>

        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>WEIGHT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{weight.date}</td>
              <td>{weight.weight}</td>
            </tr>
          </tbody>
        </table>

        <h4>TENSION</h4>

        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>TENSION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tension.date}</td>
              <td>{tension.tension}</td>
            </tr>
          </tbody>
        </table>

        <h4>WATER CONSUMPTION</h4>

        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>GLASSES OF WATERS DRANK TODAY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{waterConsumption.date}</td>
              <td>{waterConsumption.glassofwaterdrunk}</td>
            </tr>
          </tbody>
        </table>

        <h4>EXERCICES</h4>

        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>EXERCISE TYPE </th>
              <th>EXERCISE DURATION </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{exercices.date}</td>
              <td>{exercices.exercicetype}</td>
              <td>{exercices.exerciceduration}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> */
  );
};

export default graphql(UserQuery)(User);
