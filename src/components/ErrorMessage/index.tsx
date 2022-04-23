import React from 'react';
import { useForecastContext } from '../../context';

const ErrorMessage: React.FunctionComponent = () => {
  const { error } = useForecastContext();
  return <div>{error}</div>;
};

export default ErrorMessage;
