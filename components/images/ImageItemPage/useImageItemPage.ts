import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { ImageItemData } from 'types';

type ImageItemPageHook = () => {
  data: ImageItemData;
  status: 'idle' | 'error' | 'loading' | 'success';
  error: Error;
};

const useImageItemPage: ImageItemPageHook = () => {
  const router = useRouter();

  const id: string = router.asPath.slice(8);

  const { data, status, error } = useQuery<ImageItemData, Error>(
    ['imageItem', { id }],
    async ({ queryKey }: { queryKey: [string, { id: string }] }) => {
      const [_key, { id }] = queryKey;
      const res = await fetch(`/api/images/${id}`);
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.message);
      }
      return res.json();
    }
  );

  return { data, status, error };
};

export default useImageItemPage;
