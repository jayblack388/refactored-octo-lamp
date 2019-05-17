import React, { useState } from 'react';
import { Button, Input, LinkButton } from '../../common';
import { Wrapper } from '../../containers';
import { useRouter } from '../../../utils/customHooks';
import { Form } from './AuthForm.styled';

const AuthForm = props => {
  const { type, setType } = props;
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [code, setCode] = useState('');
  const { history } = useRouter();

  const body = {
    email,
    password,
  };
  const name = {
    firstName,
    lastName,
  };

  const handleSubmit = e => {
    e.preventDefault();
    isLogin ? props.onLogin(body) : props.onSignUp({ ...body, name });
    history.push('/');
  };

  const toggleType = e => {
    e.preventDefault();
    setType(isLogin ? 'signup' : 'login');
  };

  return (
    <Form isLogin={isLogin} onSubmit={handleSubmit}>
      <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
      {!isLogin && (
        <Wrapper height="20%" direction="row">
          <Input
            width="80%"
            inputWidth="70%"
            label="First Name:"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            width="80%"
            inputWidth="70%"
            label="Last Name:"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Wrapper>
      )}
      <Wrapper height={isLogin ? '80%' : '40%'}>
        <Input
          width="90%"
          label="Username:"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          width="90%"
          label="Password:"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Wrapper>
      <Wrapper height="20%">
        <LinkButton
          blue
          message={
            isLogin
              ? "Don't have an account?\nRegister here."
              : 'Already have an account?\nLogin here.'
          }
          onClick={toggleType}
        />
        <Button
          primary
          message={isLogin ? 'Login' : 'Sign Up'}
          onClick={handleSubmit}
        />
      </Wrapper>
    </Form>
  );
};

export default AuthForm;
