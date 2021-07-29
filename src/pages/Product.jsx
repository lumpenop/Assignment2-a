import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';

export default class Product extends Component {
  state = {
    product: {
      id: Math.floor(Math.random() * 100),
      title: '',
      brand: '',
      price: '',
      unlike: false,
    },
  };

  history = createBrowserHistory;
  randomRef = createRef();
  unlikeRef = createRef();

  componentDidMount() {
    this.getProduct(this.state.product.id);
    this.randomRef.current.addEventListener('click', this.randomClicked);
    this.unlikeRef.current.addEventListener('click', this.unlikeClicked);
  }

  //TODO: replace to localStorage func
  getProduct = async (id) => {
    const res = await fetchGet(`http://localhost:3000/data/productData.json`);
    const products = await res.json();
    this.setState({ product: products[id] });
  };

  //TODO: change to localStorage Func
  putProduct = async ({ id, unlike }) => {
    console.log(`[put product] id :${id} unlike : ${unlike}`);
  };
  //TODO: change to localStorage Func
  putRecentList = async ({ id, unlike }) => {
    console.log(`[push to recentList] id :${id} unlike : ${unlike}`);
  };

  randomClicked = () => {
    this._id = Math.floor(Math.random() * 100);
    this.putRecentList({ ...this.state.product, unlike: true, id: this._id });
    this.getProduct(this._id);
  };

  unlikeClicked = () => {
    this._id = Math.floor(Math.random() * 100);
    this.putProduct({ ...this.state.product, unlike: false, id: this._id });
    this.getProduct(this._id);
  };

  render() {
    const { title, brand, price } = this.state.product;

    return (
      <>
        <div className='product--card'>
          <h1>Product Page</h1>
          <h3>{title}</h3>
          <h3>{brand}</h3>
          <h3>{price}</h3>
        </div>
        <RandomButton ref={this.randomRef}>리셋</RandomButton>
        <UnlikeButton ref={this.unlikeRef}>관심없음</UnlikeButton>
      </>
    );
  }
}

//TODO: CSS Styling
const UnlikeButton = styled.button`
  border: 1px solid black;
  border-radius: 25px;
`;

const RandomButton = styled.button`
  border: 1px solid black;
  border-radius: 25px;
`;
