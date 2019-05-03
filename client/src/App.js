import React from 'react';
import { Router } from 'react-router-dom';
import { GlobalStateProvider } from './store/GlobalState';
import Routes from './Routes';
import Authenticator from './components/auth/Authenticator';

const App = props => {
  const { history } = props;

  return (
    <GlobalStateProvider>
      <Router history={history}>
        <Authenticator>
          <Routes />
        </Authenticator>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
