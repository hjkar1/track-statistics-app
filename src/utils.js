// Get token from local storage and add to authorization header.

export const getAuthHeaderConfig = () => {
  const token = window.localStorage.getItem('authToken');

  if (token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return config;
  }

  return null;
};

export const logout = () => window.localStorage.removeItem('authToken');

// Return the modes of the tracks as data for react-vis pie chart.

export const getModes = tracks => {
  const tracksInMajor = tracks.filter(track => track.mode === 1);
  const tracksInMinor = tracks.filter(track => track.mode === 0);
  const numberOfTracksInMajor = tracksInMajor.length;
  const numberOfTracksInMinor = tracksInMinor.length;

  return [
    { angle: numberOfTracksInMajor, label: 'Major' },
    { angle: numberOfTracksInMinor, label: 'Minor' }
  ];
};

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const calculateAverage = values => values.reduce(reducer) / values.length;

const getFeatures = (tracks, feature) => tracks.map(track => track[feature]);

export const getAverages = tracks => {
  const acousticness = getFeatures(tracks, 'acousticness');
  const danceability = getFeatures(tracks, 'danceability');
  const energy = getFeatures(tracks, 'energy');
  const instrumentalness = getFeatures(tracks, 'instrumentalness');
  const liveness = getFeatures(tracks, 'liveness');
  const speechiness = getFeatures(tracks, 'speechiness');
  const valence = getFeatures(tracks, 'valence');

  return [
    { y: 'acousticness', x: calculateAverage(acousticness) },
    { y: 'danceability', x: calculateAverage(danceability) },
    { y: 'energy', x: calculateAverage(energy) },
    { y: 'instrumentalness', x: calculateAverage(instrumentalness) },
    { y: 'liveness', x: calculateAverage(liveness) },
    { y: 'speechiness', x: calculateAverage(speechiness) },
    { y: 'valence', x: calculateAverage(valence) }
  ];
};
