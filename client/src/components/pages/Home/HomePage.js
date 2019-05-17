import React from 'react';
import { Page, Wrapper } from '../../containers';
import { Button, Loader } from '../../common';
import { useGlobalState } from '../../../store/GlobalState';
const HomePage = props => {
  const [{ user: { user, isLoading } }, ] = useGlobalState();

  return (
    <Page>
      <Wrapper>
        <Loader isLoading={isLoading} >
          <span>I'm the Home Page</span>
          {user.details.email}
          <Button message={'stuff'} />
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default HomePage;
