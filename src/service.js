import axios from 'axios';
import { getAuthHeaderConfig } from './utils';

const config = getAuthHeaderConfig();

const getUsersTopTracks = async () => {
  let trackIds = null;

  try {
    const result = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=50',
      config
    );

    const tracks = result.data.items;
    trackIds = tracks.map(track => track.id);
  } catch (error) {
    console.log(error);
    const errorJSON = error.toJSON();

    if (errorJSON.message === 'Request failed with status code 401') {
      return '401';
    }
  }
  return trackIds;
};

export const getAudioFeatures = async () => {
  const trackIdList = await getUsersTopTracks();
  if (!trackIdList) {
    return;
  }
  if (trackIdList === '401') {
    return 'redirect';
  }

  let audioFeatures = null;
  const trackIds = trackIdList.join(',');

  try {
    const result = await axios.get(
      `https://api.spotify.com/v1/audio-features/?ids=${trackIds}`,
      config
    );
    audioFeatures = result.data.audio_features;
  } catch (error) {
    console.log(error);
    const errorJSON = error.toJSON();

    if (errorJSON.message === 'Request failed with status code 401') {
      return 'redirect';
    }
  }
  return audioFeatures;
};
