import React from 'react';
import { css } from '@emotion/css';
import { useForecastContext } from '../../context';
import SpinnerLoading from '../util/SpinnerLoading';
import ErrorMessage from '../util/ErrorMessage';
import ForecastDaysItem from './ForecastDaysItem';
import NoResults from '../NoResults';
import { TForecastDay } from '../util/types';

const ForecastDays: React.FunctionComponent = () => {
  const { loading, error, forecastDays, showResults, cityLocation } =
    useForecastContext();
  const { containerStyles, cardStyles, forecastStyles } = componentStyling();
  return showResults ? (
    <div className={containerStyles}>
      {loading ? (
        <SpinnerLoading />
      ) : error ? (
        <div className={cardStyles}>
          <ErrorMessage />
        </div>
      ) : forecastDays.length === 0 ? (
        <div className={cardStyles}>
          <NoResults />
        </div>
      ) : (
        <div className={cardStyles}>
          <h2 className={forecastStyles}>Forecast for {cityLocation}</h2>
          {forecastDays.map((period: TForecastDay) => (
            <ForecastDaysItem
              key={period.number}
              forecastDayMetadata={period}
            />
          ))}
        </div>
      )}
    </div>
  ) : null;
};

interface TThemeableStyles {
  containerStyles: string;
  cardStyles: string;
  forecastStyles: string;
}

const componentStyling = (): TThemeableStyles => {
  const containerStyles = css`
    text-align: center;
  `;

  const cardStyles = css`
    background: #ffffff;
    border-radius: 6px;
    padding: 20px;
  `;

  const forecastStyles = css`
    font-size: 20px;
    margin: 10px 0;
    text-align: left;
  `;

  return {
    containerStyles,
    cardStyles,
    forecastStyles
  };
};

export default ForecastDays;
