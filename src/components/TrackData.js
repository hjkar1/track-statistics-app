import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { getUsersTopTracks, getAudioFeatures } from '../service';
import PieChart from './visualization/PieChart';
import BarChart from './visualization/BarChart';
import { getModes, getAverages } from '../utils';
import Container from './Container';

const TrackData = ({ location }) => {
  const [trackData, setTrackData] = useState(null);

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem('authToken', hash.access_token);
    }
  }, [hash]);

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      const trackIds = await getUsersTopTracks();
      const audioFeatures = await getAudioFeatures(trackIds);
      setTrackData(audioFeatures);
    };
    if (localStorage.getItem('authToken')) {
      fetchAudioFeatures();
    }
  }, [hash]);

  if (!localStorage.getItem('authToken') && !hash.access_token) {
    return <Redirect to="/authorize" />;
  }

  return (
    <Container>
      {trackData && (
        <div>
          <PieChart data={getModes(trackData)} />
          <BarChart data={getAverages(trackData)} />
        </div>
      )}
    </Container>
  );
};

export default TrackData;
