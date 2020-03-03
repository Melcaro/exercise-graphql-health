import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { updateQuery, UserQuery } from '../services/queries';
import compose from 'lodash.flowright';

class UserForm extends Component {
  state = {
    weight: 0,
    tension: 0,
    glassesOfWater: 0,
    exerciceType: '',
    exerciceDuration: 0,
    date: '',
  };

  onChange = (field, { target: { value } }) => {
    this.setState({
      [field]: [
        'weight',
        'tension',
        'glassesOfWater',
        'exerciceDuration',
      ].includes(field)
        ? Number(value)
        : value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const variables = { ...this.state, userID: this.props.match.params.userID };
    this.props.updateUser({
      variables,
      refetchQueries: [
        { query: UserQuery, variables: { id: this.props.match.params.userID } },
      ],
    });
  };

  render() {
    console.log('props', this.props);
    return (
      <div>
        <h1>Update your profile</h1>
        <div>
          <form>
            <div>
              <label>Your Weight</label>
              <input
                type="number"
                name="weight"
                placeholder="Enter your new weight"
                onChange={this.onChange.bind(this, 'weight')}
              ></input>{' '}
              <span>Kg</span>
            </div>
            <br />
            <div>
              <label>Your Tension</label>
              <input
                type="number"
                name="tension"
                placeholder="Enter your tension"
                onChange={this.onChange.bind(this, 'tension')}
              ></input>
            </div>
            <br />
            <div>
              <label>Glasses of water you drunk today</label>
              <input
                type="number"
                name="glassesOfWater"
                onChange={this.onChange.bind(this, 'glassesOfWater')}
              ></input>
            </div>
            <br />
            <div>
              <div>Physical Exercices</div>
              <label>Type of exercice</label>
              <input
                type="text"
                name="exerciceType"
                placeholder="What exercice did you practice?"
                onChange={this.onChange.bind(this, 'exerciceType')}
              ></input>
              <br />
              <label>Exercice's duration</label>
              <input
                type="number"
                name="exerciceDuration"
                placeholder="How many time in minutes did you practice?"
                onChange={this.onChange.bind(this, 'exerciceDuration')}
              ></input>
              <span>min</span>
            </div>
            <br />
            <div>
              <label>Date</label>
              <input
                type="datetime-local"
                name="date"
                placeholder="yy/mm/dd"
                onChange={this.onChange.bind(this, 'date')}
              ></input>
            </div>
            <br />
            <input
              type="submit"
              value="Update your profile"
              onClick={this.onSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(updateQuery, { name: 'updateUser' }),
  graphql(UserQuery, {
    name: 'UserQuery',
    options: props => ({ variables: { id: props.match.params.userID } }),
  })
)(UserForm);
