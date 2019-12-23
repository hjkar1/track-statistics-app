import { useEffect, useState } from 'react';
import { getAudioFeatures } from './service';

const useService = auth => {
  const [fetchedData, setFetchedData] = useState({
    status: 'fetch',
    trackData: null
  });

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      setFetchedData({ status: 'loading', trackData: null });
      const result = await getAudioFeatures();
      if (result === 'error') {
        setFetchedData({ status: 'error', trackData: null });
      } else {
        setFetchedData({ status: 'success', trackData: result });
      }
    };

    if (auth && fetchedData.status === 'fetch') {
      fetchAudioFeatures();
    }
  }, [auth, fetchedData]);

  return fetchedData;
};

export default useService;
