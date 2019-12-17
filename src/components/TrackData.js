import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { fetchAudioFeatures } from '../service';

const TrackData = ({ location }) => {
  //const [trackData, setTrackData] = useState([]);

  const hash = queryString.parse(location.hash);

  useEffect(() => {
    if (hash.access_token) {
      localStorage.setItem('authToken', hash.access_token);
    }
  }, [hash]);

  useEffect(() => {
    const getAudioFeatures = async () => {
      const audioFeatures = await fetchAudioFeatures();
      console.log(audioFeatures);
    };
    if (localStorage.getItem('authToken')) {
      getAudioFeatures();
    }
  }, [hash]);

  if (!localStorage.getItem('authToken') && !hash.access_token) {
    return <Redirect to="/authorize" />;
  }

  return <div></div>;
};

export default TrackData;
