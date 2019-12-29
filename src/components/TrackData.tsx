import React, { FC, Fragment, useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import PieChart from './visualization/PieChart';
import BarChart from './visualization/BarChart';
import { authToken, login, logout } from '../utils/auth';
import { getModes, getAverages, getAverageTempo } from '../utils/audioFeatures';
import Container from './ui/Container';
import Button from './ui/Button';
import useService from '../useService';
import { History, Location } from 'history';

type Props = {
  history: History;
  location: Location;
};

const TrackData: FC<Props> = ({ history, location }) => {
  const [auth, setAuth] = useState(false);
  const { status, trackData } = useService(auth);

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      const token = hash.access_token.toString();
      login(token);
      setAuth(true);
    }
    if (authToken) {
      setAuth(true);
    }
  }, [hash]);

  if (!authToken && !hash.access_token) {
    return <Redirect to="/authorize" />;
  }

  const handleLogout = () => {
    logout();
    history.push('/authorize');
  };

  if (status === 'loading') {
    return <Container>Loading...</Container>;
  }

  if (status === 'error') {
    return <Container>Something went wrong :(</Container>;
  }

  return (
    <Container>
      {trackData.length > 0 && (
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
