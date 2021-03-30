import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const useImageItemPage = () => {
  const router = useRouter();

  const id = router.asPath.slice(8);

  const { data, status, error } = useQuery<any, Error>(
    ['imageItem', { id }],
    async ({ queryKey }) => {
      const [_key, { id }] = queryKey;
      const res = await fetch(`/api/images?id=${id}`);
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error);
      }
      return res.json();
    }
  );

  return { data, status, error };
};

export default useImageItemPage;
