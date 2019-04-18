import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Loader } from './components/common';
import { HomePage, Login, Signup } from './components/pages';

const Routes = props => {
  const { isAuthenticated, authState } = props;
  return (
    <div id="App">
      <Loader isLoading={authState === 'loading'} message="Logging user in...">
        <Switch>
          {isAuthenticated || authState === 'signedIn' ? (
            // These are the authenticated routes
            <Route path="/" render={() => <HomePage {...props} />} />
          ) : (
            // These are the unauthenticate routes
            <>
              <Route exact path="/" render={() => <Login {...props} />} />
              <Route
                exact
                path="/signup"
                render={() => <Signup {...props} />}
              />
              {/* <Redirect to="/login" /> not sure why this isn't working */}
            </>
          )}
        </Switch>
      </Loader>
    </div>
  );
};

export default Routes;
