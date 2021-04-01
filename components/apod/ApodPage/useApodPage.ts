import { useQuery } from 'react-query';
import { ApodData } from 'types';

type ApodPageHook = () => {
  data: ApodData;
  error: Error;
  status: 'idle' | 'error' | 'loading' | 'success';
};

const useApodPage: ApodPageHook = () => {
  const { data, error, status } = useQuery<ApodData, Error>(
    'apod',
    async () => {
      const res = await fetch('/api/apod');
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      }
      return res.json();
    }
  );

  return { data, error, status };
};

export default useApodPage;
