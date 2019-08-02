import React from 'react';
import { toast } from 'react-toastify';
import { Page, Wrapper, Button, Loader } from 'jdb-components';

import { useGlobalState, useTheme } from '../../../store/GlobalState';
const HomePage = props => {
  const [
    {
      user: { user, isLoading },
    },
  ] = useGlobalState();
  const theme = useTheme();
  const notify = () => toast('Wow so easy !');
  return (
    <Page>
      <Wrapper>
        <Loader theme={theme} isLoading={isLoading}>
          <span>I'm the Home Page</span>
          {user.details.email}
          <Button theme={theme} onClick={notify} message={'stuff'} />
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default HomePage;
