import React from 'react';
import { Page, Wrapper } from '../../containers';
const HomePage = props => {
  console.log(props);
  return (
    <Page>
      <Wrapper fullHeight>I'm the HomePage!</Wrapper>
    </Page>
  );
};

export default HomePage;
