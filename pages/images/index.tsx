import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { ImagesPage } from 'components/images';

export const getStaticProps: GetStaticProps = async context => {
  const queryClient = new QueryClient();

  const query = 'Supernova';

  await queryClient.prefetchQuery(['images', query], async ({ queryKey }) => {
    const [_key, query] = queryKey;
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${query}&media_type=image`
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ImagesPage;
