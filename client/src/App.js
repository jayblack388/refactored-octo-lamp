import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Authenticator from './components/auth/Authenticator';

const App = props => {
  const { history } = props;
  return (
    <Router history={history}>
      <Authenticator>
        <Routes />
      </Authenticator>
    </Router>
  );
};

export default App;
