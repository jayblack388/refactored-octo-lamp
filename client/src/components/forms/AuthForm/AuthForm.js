import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Button, Input, LinkButton, Wrapper } from 'jdb-components';
import { Form, Heading } from './AuthForm.styled';
import { useGlobalState } from '../../../store/GlobalState';
import { login, signUp } from '../../../store/ducks/user';

import { useRouter } from '../../../utils/customHooks';

const AuthForm = props => {
  const { type, setType } = props;
  const theme = useContext(ThemeContext);
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const { history } = useRouter();
  const [, dispatch] = useGlobalState();
  const body = {
    email,
    password,
    code,
  };
  const name = {
    firstName,
    lastName,
  };

  const handleSubmit = e => {
    e.preventDefault();
    isLogin ? login(dispatch, body) : signUp(dispatch, { ...body, name });
    history.push('/');
  };

  const toggleType = e => {
    e.preventDefault();
    if (showCode) {
      setShowCode(false);
    }
    setType();
  };

  const toggleShowCode = e => {
    e.preventDefault();
    setShowCode(!showCode);
  };
  return (
    <Form isLogin={isLogin} onSubmit={handleSubmit}>
      <Heading>{isLogin ? 'Login' : 'Sign Up'}</Heading>
      {!isLogin && (
        <Wrapper height="20%" direction="row">
          <Input
            theme={theme}
            width="80%"
            inputWidth="85%"
            label="First Name:"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            theme={theme}
            width="80%"
            inputWidth="85%"
            label="Last Name:"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Wrapper>
      )}
      <Wrapper height={isLogin ? '80%' : '40%'}>
        <Input
          theme={theme}
          width="90%"
          inputWidth="60%"
          label="Username:"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          theme={theme}
          width="90%"
          inputWidth="60%"
          label="Password:"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {isLogin && showCode && (
          <Input
            theme={theme}
            width="50%"
            label="Login Code:"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        )}
        {isLogin && !showCode && (
          <LinkButton
            theme={theme}
            blue
            fontSize="0.75rem"
            message={
              showCode ? 'Sign up to get a code' : 'First time logging in?'
            }
            onClick={showCode ? toggleType : toggleShowCode}
          />
        )}
      </Wrapper>
      <Wrapper height="20%">
        <LinkButton
          theme={theme}
          blue
          fontSize="0.75rem"
          message={
            isLogin
              ? "Don't have an account?\nRegister here."
              : 'Already have an account?\nLogin here.'
          }
          onClick={toggleType}
        />
        <Button
          theme={theme}
          primary
          message={isLogin ? 'Login' : 'Sign Up'}
          onClick={handleSubmit}
        />
      </Wrapper>
    </Form>
  );
};

export default AuthForm;
