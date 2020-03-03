import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { allUsersQuery } from '../services/queries';

import { Link } from 'react-router-dom';

class HomePage extends Component {
  render() {
    const { loading, users } = this.props.query;
    console.log(users);
    return (
      !loading && (
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>AGE</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, age }) => (
                <div>
                  <div>{id}</div>
                  <tr key={id}>
                    <Link to={`/${id}`}>
                      <td>{name}</td>
                      <td>{age}</td>
                    </Link>
                  </tr>
                </div>
              ))}
            </tbody>
          </table>
        </div>
      )
    );
  }
}

export default compose(graphql(allUsersQuery, { name: 'query' }))(HomePage);
