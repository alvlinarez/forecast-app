import React from 'react';
import { useForecastContext } from '../../context';
import axios from 'axios';
import { TForecast, TGeocoding, TWeather } from '../util/types';
import { css } from '@emotion/css';
import searchIcon from '../../images/search-icon.png';

const SearchForecast: React.FunctionComponent = () => {
  const {
    address,
    showResults,
    updateAddress,
    enableLoading,
    disableLoading,
    updateForecastDays,
    updateError,
    enableShowResults,
    updateCityLocation
  } = useForecastContext();

  const {
    containerStyles,
    titleStyles,
    inputContainerStyles,
    inputStyles,
    searchIconStyles,
    labelStyles
  } = componentStyling();

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateAddress(e.target.value);
  };

  // we need to format the addres to: 47+W+13th+St+New+York+NY+10011
  const formatAddress = (addressToFormat: string): string => {
    return addressToFormat.trim().replaceAll(' ', '+').replaceAll(',', '');
  };

  const searchLocation = async () => {
    if (address.trim() === '') {
      updateError('Please type a location');
      return;
    }
    updateError('');
    if (!showResults) enableShowResults();
    const addressFormatted = formatAddress(address);
    try {
      enableLoading();
      const {
        data: { result }
      } = (await axios.get(
        process.env.REACT_APP_GEOCODING_URL +
          `?address=${addressFormatted}&benchmark=2020&format=json`
      )) as TGeocoding;
      const coordinateX = result.addressMatches[0].coordinates.x;
      const coordinateY = result.addressMatches[0].coordinates.y;

      updateCityLocation(
        result.addressMatches[0].addressComponents.city +
          ', ' +
          result.addressMatches[0].addressComponents.state
      );

      const {
        data: {
          properties: { forecast: forecastUrl }
        }
      } = (await axios.get(
        process.env.REACT_APP_WEATHER_URL +
          `points/${coordinateY},${coordinateX}`
      )) as TWeather;

      const { data } = (await axios.get(forecastUrl)) as TForecast;
      updateForecastDays(data.properties.periods);
    } catch (error) {
      updateError('Unexpected error. Please try again.');
    } finally {
      disableLoading();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchLocation();
    }
  };

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>7 Day Forecast</h1>

      <div className={inputContainerStyles}>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleAddress}
          className={inputStyles}
          placeholder="Search Location"
          onKeyDown={handleKeyDown}
        />
        <img
          className={searchIconStyles}
          src={searchIcon}
          alt="search-icon"
          onClick={searchLocation}
        />
      </div>
      <label htmlFor="address" className={labelStyles}>
        Please use the following format: 47 W 13TH ST, NEW YORK, NY, 10011
      </label>
    </div>
  );
};

interface TThemeableStyles {
  containerStyles: string;
  titleStyles: string;
  inputContainerStyles: string;
  inputStyles: string;
  searchIconStyles: string;
  labelStyles: string;
}

const componentStyling = (): TThemeableStyles => {
  const containerStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  `;

  const titleStyles = css`
    color: #ffffff;
    margin: 0 0 20px;
    padding: 0;
    font-size: 48px;
  `;

  const inputContainerStyles = css`
    position: relative;
    width: fit-content;
  `;

  const inputStyles = css`
    width: 380px;
    height: 38px;
    padding: 6px 38px 6px 6px;
    border-radius: 20px;
    background: hsla(0, 0%, 100%, 0.2);
    -webkit-tap-highlight-color: #1b4de4;
    border: none;
    outline: none;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;
    &:focus {
      outline: 5px auto #fff;
    }
    &::placeholder {
      color: #ffffff;
    }
  `;

  const searchIconStyles = css`
    position: absolute;
    width: 20px;
    top: 25%;
    right: 15px;
    cursor: pointer;
  `;

  const labelStyles = css`
    margin-top: 2px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
  `;

  return {
    containerStyles,
    titleStyles,
    inputContainerStyles,
    inputStyles,
    searchIconStyles,
    labelStyles
  };
};

export default SearchForecast;
