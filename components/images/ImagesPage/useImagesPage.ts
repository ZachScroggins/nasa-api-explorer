import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const fetchImages = async ({ queryKey }) => {
  const [_key, query] = queryKey;
  const res = await fetch(`/api/images?q=${query}`);
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json?.message);
  }
  return res.json();
};

const useImagesPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || 'Supernova');

  const { data, error, status } = useQuery(['images', query], fetchImages);

  useEffect(() => {
    if (router.query.q && router.query.q !== query) {
      setQuery(router.query.q);
    }
  }, [router.query]);

  return { setQuery, data, error, status };
};

export default useImagesPage;
