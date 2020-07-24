import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import EpicContext from '../src/context/epic/epicContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const epic = () => {
  const router = useRouter();
  const epicContext = useContext(EpicContext);
  const { date, type } = epicContext;

  useEffect(() => {
    if (router.asPath.slice(6) === '') {
      router.replace({
        pathname: '/epic',
        query: { date: `${date}`, type: `${type}` },
      });
    }
  }, []);

  return (
    <div>
      <h1>EPIC</h1>
    </div>
  );
};

export default epic;
