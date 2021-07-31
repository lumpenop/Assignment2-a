import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import GlobalStyle from './styles/GlobalStyle';
import styled from 'styled-components';
import ProductCard from './components/ProductCard'

const CardBlock = styled.div`
  width: 500px;
`

ReactDOM.render(
  <>
  
    <CardBlock>
      <ProductCard />
    </CardBlock>
    <GlobalStyle />
    <Routes />
  </>,
  document.getElementById('root'),
);
