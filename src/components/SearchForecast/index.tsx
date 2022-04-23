import React from 'react';
import { useForecastContext } from '../../context';
import axios from 'axios';
import { TForecast, TGeocoding, TWeather } from '../../types';

const SearchForecast: React.FunctionComponent = () => {
  const {
    address,
    updateAddress,
    enableLoading,
    disableLoading,
    updateForecastDays,
    updateError
  } = useForecastContext();

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>): void => {
    updateAddress(e.target.value);
  };

  const formatAddress = (addressToFormat: string): string => {
    return addressToFormat.trim().replaceAll(' ', '+').replaceAll(',', '');
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addressFormatted = formatAddress(address);
    try {
      enableLoading();
      updateError('');
      const {
        data: { result }
      } = (await axios.get(
        process.env.REACT_APP_GEOCODING_URL +
          `?address=${addressFormatted}&benchmark=2020&format=json`
      )) as TGeocoding;
      const coordinateX = result.addressMatches[0].coordinates.x;
      const coordinateY = result.addressMatches[0].coordinates.y;

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

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="address">Address:</label>
        <div>
          Please use the following format: 47 W 13TH ST, NEW YORK, NY, 10011
        </div>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleAddress}
          style={{ width: '300px' }}
        />
        <button type="submit">Get Location</button>
      </form>
    </div>
  );
};

export default SearchForecast;
