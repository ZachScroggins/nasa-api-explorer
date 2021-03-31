import { NextRouter } from 'next/router';
import { EpicData } from 'types';
import { EpicContent } from 'components/epic';
import { Alert } from 'components/ui';

interface ErrorContentProps {
  error: Error;
  router: NextRouter;
  prevData: EpicData | null;
  setDateQuery: React.Dispatch<React.SetStateAction<string>>;
  setTypeQuery: React.Dispatch<React.SetStateAction<string>>;
  isFetching: boolean;
}

const ErrorContent = ({
  error,
  router,
  prevData,
  setTypeQuery,
  setDateQuery,
  isFetching,
}: ErrorContentProps) => {
  return (
    <>
      <Alert
        type='danger'
        message={error.message}
        action={() => router.reload()}
      />
      {prevData && (
        <EpicContent
          data={prevData}
          setTypeQuery={setTypeQuery}
          setDateQuery={setDateQuery}
          isFetching={isFetching}
        />
      )}
    </>
  );
};

export default ErrorContent;
