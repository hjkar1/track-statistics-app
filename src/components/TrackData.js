import React, { Fragment, useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { getAudioFeatures } from '../service';
import PieChart from './visualization/PieChart';
import BarChart from './visualization/BarChart';
import { getModes, getAverages } from '../utils';
import Container from './Container';

const TrackData = ({ history, location }) => {
  const [trackData, setTrackData] = useState(null);

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem('authToken', hash.access_token);
    }
  }, [hash]);

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      const audioFeatures = await getAudioFeatures();

      if (audioFeatures === 'redirect') {
        history.push('/authorize');
      }

      if (audioFeatures) {
        setTrackData(audioFeatures);
      }
    };

    if (localStorage.getItem('authToken')) {
      fetchAudioFeatures();
    }
  }, [history]);

  if (!localStorage.getItem('authToken') && !hash.access_token) {
    return <Redirect to="/authorize" />;
  }

  return (
    <Container>
      {trackData && (
        <Fragment>
          <div style={{ margin: '1.5rem' }}>Modes of your top tracks:</div>
          <PieChart data={getModes(trackData)} />
          <div style={{ margin: '1.5rem' }}>Feature averages of your top tracks:</div>
          <BarChart data={getAverages(trackData)} />
        </Fragment>
      )}
    </Container>
  );
};

export default TrackData;
