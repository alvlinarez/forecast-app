import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles: React.FunctionComponent = () => {
  return (
    <Global
      styles={css`
        html {
          box-sizing: border-box;
          font-family: sans-serif;
        }
        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }
        body {
          margin: 0;
          padding: 0;
          font-size: 16px;
        }
      `}
    />
  );
};

export default GlobalStyles;
