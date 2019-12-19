import axios from 'axios';
import { getAuthHeaderConfig, logout } from './utils';

const getUsersTopTracks = async () => {
  let trackIds = null;
  const config = getAuthHeaderConfig();

  try {
    const result = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=50',
      config
    );

    const tracks = result.data.items;
    trackIds = tracks.map(track => track.id);
  } catch (error) {
    // 401 might be the result of an expired
    // token -> clear localStorage (log the user out).
    if (error.response.status === 401) {
      logout();
    }
  }
  return trackIds;
};

export const getAudioFeatures = async () => {
  const config = getAuthHeaderConfig();
  const trackIdList = await getUsersTopTracks();

  if (!trackIdList) {
    return;
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
    // 401 might be the result of an expired
    // token -> clear localStorage (log the user out).
    if (error.response.status === 401) {
      logout();
    }
  }
  return audioFeatures;
};
