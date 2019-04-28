import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Loader } from './components/common';
import { HomePage, Login, Signup } from './components/pages';

const Routes = props => {
  const { isAuthenticated, authState, onLogout, user } = props;
  return (
    <div id="App">
      <Loader
        isLoading={authState === 'loading'}
        message="Loading authentication..."
      >
        <Switch>
          <Route exact path="/login" render={() => <Login {...props} />} />
          <Route exact path="/signup" render={() => <Signup {...props} />} />
          <Route
            exact
            path="/"
            render={() =>
              isAuthenticated ? (
                <>
                  <Header onLogout={onLogout} />
                  <HomePage {...props} />
                </>
              ) : (
                <Login {...props} />
              )
            }
          />
          {/* <Redirect to="/login" /> not sure why this isn't working */}
        </Switch>
      </Loader>
    </div>
  );
};

export default Routes;
