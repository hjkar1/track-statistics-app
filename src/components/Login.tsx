import React, { FC } from 'react';
import Container from './ui/Container';
import LinkButton from './ui/LinkButton';

const clientID = process.env.REACT_APP_CLIENT_ID;

// Callback URI for redirect after login.
const callbackURI =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_URI
    : process.env.REACT_APP_DEV_URI;

const Login: FC = () => {
  return (
    <Container>
      <div style={{ margin: '1rem' }}>Login with your Spotify account.</div>
      <LinkButton
        href={`https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${callbackURI}&scope=user-read-private%20user-read-email%20user-top-read&response_type=token&state=123`}
      >
        Login
      </LinkButton>
    </Container>
  );
};

export default Login;
