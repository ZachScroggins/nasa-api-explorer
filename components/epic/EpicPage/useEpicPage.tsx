import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const useEpicPage = () => {
  const router = useRouter();
  const [typeQuery, setTypeQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [prevData, setPrevData] = useState(null);

  const { data, error, isFetching, status } = useQuery<any, Error>(
    ['epic', { typeQuery, dateQuery }],
    async ({ queryKey }) => {
      const [_key, { typeQuery, dateQuery }] = queryKey;
      const res = await fetch(
        `/api/epic${typeQuery && `?type=${typeQuery}`}${
          dateQuery && `&date=${dateQuery}`
        }`
      );
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error);
      }
      return res.json();
    },
    {
      keepPreviousData: true,
      onSuccess: data => setPrevData(data),
    }
  );

  return {
    router,
    setTypeQuery,
    setDateQuery,
    prevData,
    data,
    error,
    isFetching,
    status,
  };
};

export default useEpicPage;
