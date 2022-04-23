import React from 'react';
import { TForecastDay } from '../types';

interface TForecastContext {
  address: string;
  forecastDays: TForecastDay[];
  loading: boolean;
  error: string;
  updateAddress: (newAddress: string) => void;
  updateForecastDays: (newForecastDays: TForecastDay[]) => void;
  enableLoading: () => void;
  disableLoading: () => void;
  updateError: (errorMessage: string) => void;
}

const ForecastContext = React.createContext<TForecastContext | undefined>(
  undefined
);

export const useForecastContext = () => {
  const context = React.useContext(ForecastContext);
  if (context === undefined) {
    throw new Error(
      'useForecastContext must be used with in a ForecastProvider'
    );
  }
  return context;
};

interface TForecastProviderProps {
  children: React.ReactNode;
}

export const ForecastProvider: React.FunctionComponent<
  TForecastProviderProps
> = ({ children }) => {
  const [address, setAddress] = React.useState<string>('');
  const [forecastDays, setForecastDays] = React.useState<TForecastDay[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const updateAddress = (newAddress: string): void => {
    setAddress(newAddress);
  };

  const updateForecastDays = (newForecastDays: TForecastDay[]): void => {
    setForecastDays(newForecastDays);
  };

  const enableLoading = (): void => {
    setLoading(true);
  };

  const disableLoading = (): void => {
    setLoading(false);
  };

  const updateError = (errorMessage: string = ''): void => {
    setError(errorMessage);
  };

  return (
    <ForecastContext.Provider
      value={{
        address,
        forecastDays,
        loading,
        error,
        updateAddress,
        updateForecastDays,
        enableLoading,
        disableLoading,
        updateError
      }}
    >
      {children}
    </ForecastContext.Provider>
  );
};
