import React, { Fragment, useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import PieChart from './visualization/PieChart';
import BarChart from './visualization/BarChart';
import { login, logout } from '../utils/auth';
import { getModes, getAverages, getAverageTempo } from '../utils/audioFeatures';
import Container from './Container';
import styled from 'styled-components';
import useService from '../useService';

const Button = styled.button`
  background-color: green;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 0.5rem;
  text-align: center;
  text-decoration: none;
`;

const TrackData = ({ history, location }) => {
  const [auth, setAuth] = useState(false);
  const { status, trackData } = useService(auth);

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      login(hash.access_token);
      setAuth(true);
    }
  }, [hash]);

  if (!auth && !hash.access_token) {
    return <Redirect to="/authorize" />;
  }

  const handleLogout = () => {
    logout();
    history.push('/authorize');
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Something went wrong :(</div>;
  }

  return (
    <Container>
      {trackData && (
        <Fragment>
          <div style={{ margin: '1.5rem' }}>Modes of your top tracks:</div>
          <PieChart data={getModes(trackData)} />
          <div style={{ margin: '1.5rem' }}>
            Feature averages of your top tracks:
          </div>
          <BarChart data={getAverages(trackData)} />
          <div style={{ margin: '1.5rem' }}>
            Average tempo of your top tracks: {getAverageTempo(trackData)} beats
            per minute
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </Fragment>
      )}
    </Container>
  );
};

export default TrackData;
