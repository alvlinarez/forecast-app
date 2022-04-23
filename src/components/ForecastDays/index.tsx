import React from 'react';
import { useForecastContext } from '../../context';
import SpinnerLoading from '../SpinnerLoading';
import ErrorMessage from '../ErrorMessage';
import NoResults from '../NoResults';
import ForecastDaysItem from './ForecastDaysItem';
import { TForecastDay } from '../../types';

const ForecastDays: React.FunctionComponent = () => {
  const { loading, error, forecastDays } = useForecastContext();
  return (
    <div>
      {loading ? (
        <SpinnerLoading />
      ) : error ? (
        <ErrorMessage />
      ) : forecastDays.length === 0 ? (
        <NoResults />
      ) : (
        forecastDays.map((period: TForecastDay) => (
          <ForecastDaysItem key={period.number} forecastDayMetadata={period} />
        ))
      )}
    </div>
  );
};

export default ForecastDays;
