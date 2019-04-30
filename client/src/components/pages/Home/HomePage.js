import React from 'react';
import { Page, Wrapper } from '../../containers';
import { Button } from '../../common';
import { useGlobalState } from '../../../store/GlobalState';
const HomePage = props => {
  const [{ user }, actions] = useGlobalState();
  console.log(user);
  console.log(actions);
  return (
    <Page>
      <Wrapper fullHeight>
        <span>I'm the Home Page</span>
        {user.user.email}
        <Button message={'stuff'} />
      </Wrapper>
    </Page>
  );
};

export default HomePage;
