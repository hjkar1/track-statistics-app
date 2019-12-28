// Return the modes of the tracks as data for react-vis pie chart.

export const getModes = (tracks: Array<any>) => {
  const tracksInMajor = tracks.filter(track => track.mode === 1);
  const tracksInMinor = tracks.filter(track => track.mode === 0);
  const numberOfTracksInMajor = tracksInMajor.length;
  const numberOfTracksInMinor = tracksInMinor.length;

  return [
    { angle: numberOfTracksInMajor, label: 'Major' },
    { angle: numberOfTracksInMinor, label: 'Minor' }
  ];
};

const reducer = (accumulator: number, currentValue: number) =>
  accumulator + currentValue;

const calculateAverage = (values: Array<number>) =>
  values.reduce(reducer) / values.length;

const getTracksWithFeature = (tracks: Array<any>, feature: string) =>
  tracks.map(track => track[feature]);

// Get the averages of audio features of the tracks as data for react-vis bar chart.

export const getAverages = (tracks: Array<any>) => {
  const acousticness = getTracksWithFeature(tracks, 'acousticness');
  const danceability = getTracksWithFeature(tracks, 'danceability');
  const energy = getTracksWithFeature(tracks, 'energy');
  const instrumentalness = getTracksWithFeature(tracks, 'instrumentalness');
  const liveness = getTracksWithFeature(tracks, 'liveness');
  const speechiness = getTracksWithFeature(tracks, 'speechiness');
  const valence = getTracksWithFeature(tracks, 'valence');

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

// Get the average tempo of the tracks.

export const getAverageTempo = (tracks: Array<any>) => {
  const trackTempos = getTracksWithFeature(tracks, 'tempo');
  const averageTempo = calculateAverage(trackTempos);
  return Math.round(averageTempo);
};
