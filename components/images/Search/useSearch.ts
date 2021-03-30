import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useSearch = ({ setQuery }) => {
  const router = useRouter();
  const [input, setInput] = useState(router.query.q || 'Supernova');

  const handleSearch = e => {
    e.preventDefault();
    router.push({
      pathname: '/images',
      query: { q: input },
    });
    setQuery(input);
  };

  useEffect(() => {
    if (router.query.q && router.query.q !== input) {
      setInput(router.query.q);
    }
  }, [router.query]);

  return { handleSearch, input, setInput };
};

export default useSearch;
