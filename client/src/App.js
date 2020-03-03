import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';

import { client } from './services/services';

import { Header } from './components/Header';
import HomePage from './components/HomePage';
import User from './components/User';
import UserForm from './components/UserForm';

import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" render={() => <Header />} />
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/:userID" render={props => <User {...props} />} />
          <Route
            exact
            path="/:userID/updateProfile"
            render={props => <UserForm {...props} />}
          />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
