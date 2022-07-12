import React from 'react';

type LoadableStringProps = {
  loadResult: Promise<string>;
  placeholder: string;
};

const LoadableString: React.FC<LoadableStringProps> = ({
  loadResult,
  placeholder,
}) => {
  const [result, setResult] = React.useState<string>();

  React.useEffect(() => {
    loadResult.then(setResult);
  }, [loadResult]);

  if (result === undefined)
    return <>{placeholder}</>;

  return <>{result}</>;
};

export default React.memo(LoadableString);
