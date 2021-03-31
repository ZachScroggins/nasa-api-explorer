import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ImagesData } from 'types';

type ImagesPageHook = () => {
  setQuery: React.Dispatch<React.SetStateAction<string | string[]>>;
  data: ImagesData;
  error: Error;
  status: 'idle' | 'error' | 'loading' | 'success';
};

type QueryParams = {
  queryKey: [string, string | string[]];
};

const fetchImages = async (params: QueryParams) => {
  const [_key, query] = params.queryKey;
  const res = await fetch(`/api/images?q=${query}`);
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.message);
  }
  return res.json();
};

const useImagesPage: ImagesPageHook = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || 'Supernova');

  const { data, error, status } = useQuery<ImagesData, Error>(
    ['images', query],
    fetchImages
  );

  useEffect(() => {
    if (router.query.q && router.query.q !== query) {
      setQuery(router.query.q);
    }
  }, [router.query]);

  return { setQuery, data, error, status };
};

export default useImagesPage;
