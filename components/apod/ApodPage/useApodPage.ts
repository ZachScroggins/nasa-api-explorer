import { useQuery } from 'react-query';

const useApodPage = () => {
  const { data, error, status } = useQuery<any, Error>('apod', async () => {
    const res = await fetch('/api/apod');
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json?.message);
    }
    return res.json();
  });

  return { data, error, status };
};

export default useApodPage;
