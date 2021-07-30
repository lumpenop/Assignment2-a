import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { saveStore, getStore, updateProduct } from '../utils/storage';
import { MAX, RANDOM_0_MAX } from '../utils/config';

// TODO 1. 최근 이력, 이미 본 상품 앞으로 끌어오는거
// TODO 2. 00시 되면 최근 이력, unlike 갱신

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

  history = createBrowserHistory;
  randomRef = createRef();
  unlikeRef = createRef();

  componentDidMount() {
    this.fetchProducts();
    this.randomRef.current.addEventListener('click', this.onClickRandom);
    this.unlikeRef.current.addEventListener('click', this.onClickUnlike);
  }

  // ls에 없을 때 fetch하고, 랜덤으로 상품 불러옴
  fetchProducts = async () => {
    if (getStore('productList').length) {
      const randomProduct = this.getRandomProduct(RANDOM_0_MAX(), false);
      this.setState({ product: { ...this.state.product, ...randomProduct } });
      return;
    }

    const res = await fetchGet(`http://localhost:3000/data/productData.json`);
    const products = await res.json();
    localStorage.setItem(
      'productList',
      JSON.stringify(products.map((el, idx) => Object.assign({ id: idx, unlike: false }, el)))
    );

    const randomProduct = this.getRandomProduct(RANDOM_0_MAX(), false);
    this.setState({ product: { ...this.state.product, ...randomProduct } });
  };

  // 랜덤으로 제품 가져오고, id와 unlike 할당한 product 객체 리턴하는 함수
  // TODO : 똑같은 상품 나올 시 앞으로 빼주는거
  getRandomProduct = (_id, _unlike) => {
    let randomProduct = getStore('productList')[_id];
    while (true) {
      // TODO 구현되면, 이거 필요 없음
      if (getStore('recentViewed').length === MAX) {
        localStorage.clear();
      }

      // 현재와 다른 제품, unlike === false 아니면 다시 돌리기
      if (this.state.product.id !== _id && getStore('productList')[_id].unlike === false) {
        break;
      }

      _id = RANDOM_0_MAX(); // id 랜덤으로
    }

    return Object.assign(randomProduct, { id: _id, unlike: _unlike }); // 가져온 product에 id 갱신해서 리턴(바뀔수도있으므로)
  };

  // id와 unlike가 새로 할당된 product 객체를
  // 1. setState, 2. ls의 product 갱신, 3. 최근이력에 추가해주는 함수
  setProduct = (_product) => {
    this.setState({ product: { ...this.state.product, ..._product } });
    updateProduct(_product);
    saveStore('recentViewed', _product);
  };

  onClickRandom = () => this.setProduct(this.getRandomProduct(RANDOM_0_MAX(), false)); // unlike : false
  onClickUnlike = () => this.setProduct(this.getRandomProduct(RANDOM_0_MAX(), true)); // unlike : true

  render() {
    const { title, brand, price } = this.state.product;

    return (
      <Container>
        <div className='ProductCard'>
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
