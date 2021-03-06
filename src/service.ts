import axios from 'axios';
import { getAuthHeaderConfig, logout } from './utils/auth';

const getUsersTopTracks = async () => {
  let result;
  const config = getAuthHeaderConfig();

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=50',
      config
    );

    if (response.data.items.length > 0) {
      const tracks = response.data.items;
      result = tracks.map((track: any) => track.id);
    }
  } catch (error) {
    // 401 might be the result of an expired
    // token -> clear localStorage (log the user out).
    if (error.response.status === 401) {
      logout();
    }
    result = 'error';
  }
  return result;
};

export const getAudioFeatures = async () => {
  const config = getAuthHeaderConfig();
  const trackIdList = await getUsersTopTracks();

  if (!trackIdList) {
    return;
  }

  let result;
  const trackIds = trackIdList.join(',');

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features/?ids=${trackIds}`,
      config
    );

    result = response.data.audio_features;
  } catch (error) {
    // 401 might be the result of an expired
    // token -> clear localStorage (log the user out).
    if (error.response.status === 401) {
      logout();
    }
    result = 'error';
  }
  return result;
};
