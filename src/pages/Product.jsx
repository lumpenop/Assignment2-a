import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { getStore, updateProduct, pushRecentList } from '../utils/storage';
import { RANDOM_0_MAX } from '../utils/config';

// TODO 00시 되면 최근 이력, unlike 갱신

export default class Product extends Component {
  state = {
    product: {
      id: 0,
      title: '',
      brand: '',
      price: '',
      unlike: false,
    },
  };

  history = createBrowserHistory();
  randomRef = createRef();
  unlikeRef = createRef();

  componentDidMount() {
    const id = this.history.location.state;
    this.fetchProducts(id);
    this.randomRef.current.addEventListener('click', this.onClickRandom);
    this.unlikeRef.current.addEventListener('click', this.onClickUnlike);
  }

  fetchProducts = async (_id) => {
    if (!getStore('productList').length) {
      const res = await fetchGet(`http://localhost:3000/data/productData.json`);
      const products = await res.json();
      localStorage.setItem(
        'productList',
        JSON.stringify(products.map((el, idx) => Object.assign({ id: idx, unlike: false }, el)))
      );
    }

    if (_id) {
      const product = this.getProduct(_id, false);
      this.setState({ product: { ...this.state.product, ...product } });
    } else {
      const randomProduct = this.getProduct(RANDOM_0_MAX(), false);
      this.setState({ product: { ...this.state.product, ...randomProduct } });
    }
  };

  getProduct = (_id, _unlike) => {
    let product = getStore('productList')[_id];

    while (true) {
      if (this.state.product.id !== _id && getStore('productList')[_id].unlike === false) {
        break;
      }

      _id = RANDOM_0_MAX();
    }

    return Object.assign(product, { id: _id, unlike: _unlike });
  };

  setProduct = (_product) => {
    this.setState({ product: { ...this.state.product, ..._product } });
    updateProduct(_product);
    pushRecentList(_product);
  };

  onClickRandom = () => this.setProduct(this.getProduct(RANDOM_0_MAX(), false));
  onClickUnlike = () => this.setProduct(this.getProduct(RANDOM_0_MAX(), true));

  render() {
    const { title, brand, price, id } = this.state.product;

    return (
      <Container>
        <div className='ProductCard'>
          <h3>{id}</h3>
          <h3>{title}</h3>
          <h3>{brand}</h3>
          <h3>{price}</h3>
        </div>
        <RandomButton ref={this.randomRef}>랜덤</RandomButton>
        <UnlikeButton ref={this.unlikeRef}>관심없음</UnlikeButton>
      </Container>
    );
  }
}

//TODO: CSS Styling
const Container = styled.div``;

const UnlikeButton = styled.button`
  border: 1px solid black;
  border-radius: 25px;
`;

const RandomButton = styled.button`
  border: 1px solid black;
  border-radius: 25px;
`;
