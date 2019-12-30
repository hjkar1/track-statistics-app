import React from 'react';
import { render, wait } from '@testing-library/react';
import axios from 'axios';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import TrackData from './TrackData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTracks = {
  items: [{ id: 'test1' }, { id: 'test2' }]
};

const mockData = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  audio_features: [
    {
      mode: 1,
      acousticness: 0.1,
      energy: 0.2,
      instrumentalness: 0.3,
      liveness: 0.4,
      speechiness: 0.5,
      valence: 0.6,
      tempo: 100
    },
    {
      mode: 0,
      acousticness: 0.7,
      energy: 0.8,
      instrumentalness: 0.9,
      liveness: 0.1,
      speechiness: 0.2,
      valence: 0.3,
      tempo: 200
    }
  ]
};

mockedAxios.get.mockImplementation((url: string) => {
  switch (url) {
    case 'https://api.spotify.com/v1/me/top/tracks?limit=50':
      return Promise.resolve({ data: mockTracks });
    case 'https://api.spotify.com/v1/audio-features/?ids=test1,test2':
      return Promise.resolve({ data: mockData });
    default:
      return Promise.reject(new Error('not found'));
  }
});

test('fetches and displays the data', async () => {
  const history = createMemoryHistory();

  const mockLocation = {
    key: '123',
    pathname: '/',
    search: '',
    hash: '#access_token=1234',
    state: {}
  };

  const { getByText, getByTestId } = render(
    <Router history={history}>
      <TrackData history={history} location={mockLocation} />
    </Router>
  );

  await wait(() => {
    const pieChart = getByTestId('piechart');
    const barChart = getByTestId('barchart');
    const avgTempo = getByText(
      'Average tempo of your top tracks: 150 beats per minute'
    );
    expect(pieChart).toBeDefined();
    expect(barChart).toBeDefined();
    expect(avgTempo).toBeDefined();
  });
});
