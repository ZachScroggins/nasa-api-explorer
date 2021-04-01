import { useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { EpicData } from 'types';

type EpicPageHook = () => {
  data: EpicData;
  error: Error;
  isFetching: boolean;
  prevData: EpicData | null;
  router: NextRouter;
  setDateQuery: React.Dispatch<React.SetStateAction<string>>;
  setTypeQuery: React.Dispatch<React.SetStateAction<string>>;
  status: 'idle' | 'error' | 'loading' | 'success';
};

const useEpicPage: EpicPageHook = () => {
  const router = useRouter();
  const [typeQuery, setTypeQuery] = useState('');
  const [dateQuery, setDateQuery] = useState('');
  const [prevData, setPrevData] = useState(null);

  const { data, error, isFetching, status } = useQuery<EpicData, Error>(
    ['epic', { typeQuery, dateQuery }],
    async ({
      queryKey,
    }: {
      queryKey: [string, { typeQuery: string; dateQuery: string }];
    }) => {
      const [_key, { typeQuery, dateQuery }] = queryKey;
      const res = await fetch(
        `/api/epic${typeQuery && `?type=${typeQuery}`}${
          dateQuery && `&date=${dateQuery}`
        }`
      );
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message);
      }
      return res.json();
    },
    {
      keepPreviousData: true,
      onSuccess: data => setPrevData(data),
    }
  );

  return {
    data,
    error,
    isFetching,
    prevData,
    router,
    setDateQuery,
    setTypeQuery,
    status,
  };
};

export default useEpicPage;
