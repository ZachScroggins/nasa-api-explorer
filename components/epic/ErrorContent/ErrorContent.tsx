import { EpicContent } from 'components/epic';
import { Alert } from 'components/ui';

const ErrorContent = ({
  error,
  router,
  prevData,
  setTypeQuery,
  setDateQuery,
  isFetching,
}) => {
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
