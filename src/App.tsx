import React from 'react';
import { ForecastProvider } from './context';
import SearchForecast from './components/SearchForecast';
import ForecastDays from './components/ForecastDays';

function App() {
  return (
    <ForecastProvider>
      <SearchForecast />

      <ForecastDays />
    </ForecastProvider>
  );
}

export default App;
