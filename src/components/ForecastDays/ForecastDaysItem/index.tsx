import React from 'react';
import { TForecastDay } from '../../../types';

interface TForecastDaysItemProps {
  forecastDayMetadata: TForecastDay;
}

const ForecastDaysItem: React.FunctionComponent<TForecastDaysItemProps> = ({
  forecastDayMetadata
}: TForecastDaysItemProps) => {
  return (
    <div>
      <div>{forecastDayMetadata.name}:&nbsp;</div>
      <div>{forecastDayMetadata.temperature}</div>
    </div>
  );
};

export default ForecastDaysItem;
