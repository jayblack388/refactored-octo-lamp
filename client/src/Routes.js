import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Header, Loader } from './components/common';
import { HomePage, Login, Signup } from './components/pages';

const Routes = props => {
  const { isAuthenticated, authState, onLogout } = props;
  return (
    <div id="App">
      <Loader isLoading={authState === 'loading'} message="Logging user in...">
        <Switch>
          <Route exact path="/login" render={() => <Login {...props} />} />
          <Route exact path="/signup" render={() => <Signup {...props} />} />
          <Route
            path="/"
            render={() =>
              isAuthenticated ? (
                <>
                  <Header onLogout={onLogout} />
                  <HomePage {...props} />
                </>
              ) : (
                <Redirect exact path="/" to="/login" />
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
