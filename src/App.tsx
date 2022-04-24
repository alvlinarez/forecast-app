import React from 'react';
import { ForecastProvider } from './context';
import SearchForecast from './components/SearchForecast';
import ForecastDays from './components/ForecastDays';
import { css } from '@emotion/css';

function App() {
  const { containerStyles, paddingStyles } = componentStyling();

  return (
    <ForecastProvider>
      <div className={containerStyles}>
        <div className={paddingStyles}>
          <SearchForecast />

          <ForecastDays />
        </div>
      </div>
    </ForecastProvider>
  );
}

interface TThemeableStyles {
  containerStyles: string;
  paddingStyles: string;
}

const componentStyling = (): TThemeableStyles => {
  const containerStyles = css`
    background-color: #022d50;
    padding: 0 6%;
    min-height: 100vh;
  `;

  const paddingStyles = css`
    max-width: 1500px;
    margin: 0 auto;
  `;

  return {
    containerStyles,
    paddingStyles
  };
};

export default App;
