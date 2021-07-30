import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { saveStore, removeStore } from '../utils/storage';

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

  componentDidUpdate(_, prevState) {
    if (prevState.product !== this.state.product) {
      saveStore('recentViewed', this.state.product);
    }
  }

  getProduct = async (id) => {
    const res = await fetchGet(`http://localhost:3000/data/productData.json`);
    const products = await res.json();
    localStorage.setItem(
      'productList',
      JSON.stringify(
        products.map((el, idx) =>
          Object.assign({ id: idx, unlike: false }, el),
        ),
      ),
    );
    const newProducts = JSON.parse(localStorage.getItem('productList')).filter(
      (product) => product.unlike === false,
    );
    this.setState({ product: newProducts[id] });
  };

  putProduct = async ({ id, unlike }) => {
    console.log(`[put product] id :${id} unlike : ${unlike}`);
  };

  randomClicked = () => {
    this._id = Math.floor(Math.random() * 100);
    this.getProduct(this._id);
  };

  unlikeClicked = () => {
    removeStore('recentViewed', this.state.product);
    this._id = Math.floor(Math.random() * 100);
    const newProduct = { ...this.state.product, unlike: true };
    this.setState({ product: newProduct });
    // componentDidUpdate 발생
    this.getProduct(this._id);
  };

  render() {
    const { title, brand, price } = this.state.product;

    return (
      <>
        <div className="product--card">
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
