import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type SearchHook = (
  setQuery: React.Dispatch<React.SetStateAction<string | string[]>>
) => {
  handleSearch: React.FormEventHandler<HTMLFormElement>;
  input: string | string[];
  setInput: React.Dispatch<React.SetStateAction<string | string[]>>;
};

const useSearch: SearchHook = setQuery => {
  const router = useRouter();
  const [input, setInput] = useState(router.query.q || 'Supernova');

  const handleSearch: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    router.push({
      pathname: '/images',
      query: { q: input },
    });
    setQuery(input);
    const target = e.target as typeof e.target & {
      search: HTMLInputElement;
    };
    if (typeof window !== 'undefined') target.search.blur();
  };

  useEffect(() => {
    if (router.query.q && router.query.q !== input) {
      setInput(router.query.q);
    }
  }, [router.query]);

  return { handleSearch, input, setInput };
};

export default useSearch;
