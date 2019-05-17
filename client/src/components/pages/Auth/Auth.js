import React, { useState } from 'react';
import { Page, Wrapper } from '../../containers';
import AuthForm from '../../forms/AuthForm/AuthForm';

const AuthPage = props => {
  const [type, setType] = useState(props.type || 'login');
  return (
    <Page>
      <Wrapper>
        <AuthForm type={type} setType={setType} {...props} />
      </Wrapper>
    </Page>
  );
};

export default AuthPage;
