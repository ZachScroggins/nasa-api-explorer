import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { Results, Search, ImagesPage } from 'components/images';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default ImagesPage;

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
