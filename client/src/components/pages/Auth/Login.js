import React, { useState } from 'react';
import { Page, Wrapper } from '../../containers';
import { Button } from '../../common';
import { useRouter } from '../../../utils/customHooks';

const QuickForm = props => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const { history, location, match } = useRouter();

  const handleSubmit = e => {
    e.preventDefault();
    props.onLogin(name, password);
    history.push('/');
  };
  return (
    <form
      style={{ height: '100%', paddingTop: '10rem' }}
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '30%'
        }}
      >
        <label>
          Username:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <label>
          First time logging in? Please use the code from the email you recieved
          here
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </label>
        <Button primary onClick={handleSubmit} message="Login" />
      </div>
    </form>
  );
};

const Login = props => {
  return (
    <Page>
      <Wrapper fullHeight>
        <QuickForm {...props} />
      </Wrapper>
    </Page>
  );
};

export default Login;
