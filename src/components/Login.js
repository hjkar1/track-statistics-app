import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const clientID = process.env.REACT_APP_CLIENT_ID;

// Callback URI for redirect after login.
const callbackURI = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_URI
    : process.env.REACT_APP_DEV_URI;

const LinkButton = styled.a`
  background-color: green;
  border-radius: 4px;
  color: white;
  margin: 1rem;
  padding: 0.5rem;
  text-decoration: none;
`;

const Login = () => {
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
