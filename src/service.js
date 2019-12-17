import { getAuthHeader } from './utils';

const authHeader = getAuthHeader();

export const getUsersTopTracks = async () => {
  let trackIds = null;
  const options = { method: 'GET', headers: authHeader };

  try {
    const response = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?limit=50',
      options
    );
    const result = await response.json();
    const tracks = result.items;
    trackIds = tracks.map(track => track.id);
  } catch (error) {
    console.log(error);
  }
  return trackIds;
};

export const getAudioFeatures = async trackIdList => {
  let audioFeatures = null;
  const trackIds = trackIdList.join(',');

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/audio-features/?ids=${trackIds}`,
      {
        method: 'GET',
        headers: authHeader
      }
    );
    const result = await response.json();
    audioFeatures = result.audio_features;
  } catch (error) {
    console.log(error);
  }
  return audioFeatures;
};
