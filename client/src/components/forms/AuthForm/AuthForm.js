import React, { useState } from 'react';
import { Button, Input, InputContainer, Label, LabelText } from '../../common';
import { Wrapper } from '../../containers';
import { useRouter } from '../../../utils/customHooks';
import { Form } from './AuthForm.styled';

const AuthForm = props => {
  const { type } = props;
  const isLogin = type === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const { history } = useRouter();

  let body = {
    email,
    password,
  };

  const handleSubmit = e => {
    e.preventDefault();
    isLogin ? props.onLogin(body) : props.onSignUp();
    history.push('/');
  };

  return (
    <Form isLogin={isLogin} onSubmit={handleSubmit}>
      <Wrapper height={isLogin ? '80%' : '50%'}>
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
      <Button
        primary
        onClick={handleSubmit}
        message={isLogin ? 'Login' : 'Sign Up'}
      />
    </Form>
  );
};

export default AuthForm;
