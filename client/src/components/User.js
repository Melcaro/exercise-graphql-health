import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { UserQuery } from '../services/queries';

const User = props => {
  const { loading, user = {} } = props.UserQuery;

  return (
    !loading && (
      <div>
        <div>USER PAGE</div>
        <div key={user.id}>
          <h3>{user.name}</h3>
          <div>Age: {user.age} yo</div>

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
                <td>{user.weight.date}</td>
                <td>{user.weight.weight}</td>
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
                <td>{user.tension.date}</td>
                <td>{user.tension.tension}</td>
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
                <td>{user.waterConsumption.date}</td>
                <td>{user.waterConsumption.glassofwaterdrunk}</td>
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
                <td>{user.exercices.date}</td>
                <td>{user.exercices.exercicetype}</td>
                <td>{user.exercices.exerciceduration}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link to={`/${user.id}/updateProfile`}>
          <div>Update Your Profile</div>
        </Link>
      </div>
    )
  );
};

export default graphql(UserQuery, {
  name: 'UserQuery',
  options: props => ({
    variables: { id: props.match.params.userID },
  }),
})(User);
