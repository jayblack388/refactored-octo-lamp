import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStateProvider } from './store/GlobalState';
import Routes from './Routes';
import Authenticator from './components/auth/Authenticator';
import theme from './utils/styles/theme';

const App = props => {
  const { history } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <Router history={history}>
          <Authenticator>
            <Routes />
          </Authenticator>
        </Router>
      </GlobalStateProvider>
    </ThemeProvider>
  );
};

export default App;
