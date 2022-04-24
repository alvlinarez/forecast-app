import React from 'react';
import { css, cx } from '@emotion/css';
import { TForecastDay } from '../../util/types';
import windIcon from '../../../images/wind-icon.png';
import mediaQueryHelper from '../../util/helpers/mediaQueryHelper';

interface TForecastDaysItemProps {
  forecastDayMetadata: TForecastDay;
}

const { md } = mediaQueryHelper;

const ForecastDaysItem: React.FunctionComponent<TForecastDaysItemProps> = ({
  forecastDayMetadata
}: TForecastDaysItemProps) => {
  const {
    name,
    startTime,
    temperature,
    temperatureUnit,
    icon,
    shortForecast,
    windSpeed,
    windDirection
  } = forecastDayMetadata;
  const {
    containerStyles,
    rowStyles,
    dateStyles,
    temperatureStyles,
    forecastStyles,
    windStyles
  } = componentStyling();

  const getDate = (): string => {
    if (name === 'Overnight') {
      return 'Overnight';
    }
    const date = new Date(startTime);
    return name + ' ' + date.getDate();
  };

  return (
    <div className={containerStyles}>
      <div className={dateStyles}>{getDate()}</div>
      <div className={temperatureStyles}>
        {temperature}° {temperatureUnit}
      </div>
      <div className={cx(rowStyles, forecastStyles)}>
        <img src={icon} alt="weather-icon" />
        <div>{shortForecast}</div>
      </div>
      <div className={cx(rowStyles, windStyles)}>
        <img src={windIcon} alt="wind-icon" />
        <div>
          {windDirection} {windSpeed}
        </div>
      </div>
    </div>
  );
};

interface TThemeableStyles {
  containerStyles: string;
  rowStyles: string;
  dateStyles: string;
  temperatureStyles: string;
  forecastStyles: string;
  windStyles: string;
}

const componentStyling = (): TThemeableStyles => {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #8c8c8c;
    & div {
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    &:last-of-type {
      border-bottom: none;
    }
    ${md} {
      flex-direction: row;
      & div {
        margin-bottom: 0px;
      }
    }
  `;

  const rowStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const dateStyles = css`
    width: 100%;
    text-align: left;
    ${md} {
      width: 15%;
    }
  `;

  const temperatureStyles = css`
    width: 100%;
    text-align: left;
    ${md} {
      width: 10%;
    }
  `;

  const forecastStyles = css`
    width: 100%;
    text-align: left;
    img {
      width: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    ${md} {
      width: 50%;
    }
  `;

  const windStyles = css`
    width: 100%;
    img {
      width: 20px;
      margin-right: 10px;
    }
    ${md} {
      width: 20%;
    }
  `;

  return {
    containerStyles,
    rowStyles,
    dateStyles,
    temperatureStyles,
    forecastStyles,
    windStyles
  };
};

export default ForecastDaysItem;
