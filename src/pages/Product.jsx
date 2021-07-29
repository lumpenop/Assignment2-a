import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';

export default class Product extends Component {
  state = {
    product: {
      id: Math.floor(Math.random() * 100),
      title: '나이키 데이브레이크',
      brand: '나이키',
      price: '1500000',
      unlike: false,
    },
  };

  componentDidMount() {}

  render() {
    const { title, brand, price } = this.state.product;

    return (
      <div>
        <h1>Product Page</h1>
        <h3>{title}</h3>
        <h3>{brand}</h3>
        <h3>{price}</h3>
        <RandomButton>리셋</RandomButton>
        <UnlikeButton>관심없음</UnlikeButton>
      </div>
    );
  }
}

const UnlikeButton = styled.button`
  border: 1px solid black;
  border-radius: 25px;
`;

const RandomButton = styled.button`
  border: 1px solid black;
  border-radius: 25px;
`;
