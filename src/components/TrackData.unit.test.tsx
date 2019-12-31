import React from 'react';
import { render } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import TrackData from './TrackData';
import useService from '../useService';

jest.mock('../useService');

const history = createMemoryHistory();

const mockLocation = {
  key: '123',
  pathname: '/',
  search: '',
  hash: '#access_token=1234',
  state: {}
};

test('displays a message if there is no data available', () => {
  mocked(useService).mockReturnValue({
    status: 'success',
    trackData: []
  });

  const { getByText } = render(
    <Router history={history}>
      <TrackData history={history} location={mockLocation} />
    </Router>
  );

  const message = getByText('Top track data not available.');
  expect(message).toBeDefined();
});

test('displays loading message', () => {
  mocked(useService).mockReturnValue({
    status: 'loading',
    trackData: []
  });

  const { getByText } = render(
    <Router history={history}>
      <TrackData history={history} location={mockLocation} />
    </Router>
  );

  const message = getByText('Loading...');
  expect(message).toBeDefined();
});

test('displays error message', () => {
  mocked(useService).mockReturnValue({
    status: 'error',
    trackData: []
  });

  const { getByText } = render(
    <Router history={history}>
      <TrackData history={history} location={mockLocation} />
    </Router>
  );

  const message = getByText('Something went wrong :(');
  expect(message).toBeDefined();
});
