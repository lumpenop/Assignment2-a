import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './src/Routes';
import GlobalStyle from './src/styles/GlobalStyle';

ReactDOM.render(
  <>
    <GlobalStyle />
    <Routes />
  </>,
  document.getElementById('root')
);
