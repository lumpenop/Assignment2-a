import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { saveStore, getStore, updateProduct } from '../utils/storage';
import { MAX, RANDOM_0_MAX } from '../utils/config';

// 컴디업후 최근 이력 추가하려했으나, 로직상, onClick 이벤트 맨 마지막에 갱신하는게 자연스러워서 거기로 뺐습니다.

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

  // 첫 렌더링시, fetch data
  // ls에 이미 있을시 fetch X, 랜덤만 해줌
  fetchProducts = async () => {
    if (getStore('productList').length) {
      const randomProduct = this.getRandomProduct(RANDOM_0_MAX());
      const assignedProduct = Object.assign(randomProduct, { unlike: false });
      this.setState({ product: { ...this.state.product, ...assignedProduct } });
      return;
    }

    const res = await fetchGet(`http://localhost:3000/data/productData.json`);
    const products = await res.json();
    localStorage.setItem(
      'productList',
      JSON.stringify(products.map((el, idx) => Object.assign({ id: idx, unlike: false }, el)))
    );

    const randomProduct = this.getRandomProduct(RANDOM_0_MAX());
    const assignedProduct = Object.assign(randomProduct, { unlike: false });
    this.setState({ product: { ...this.state.product, ...assignedProduct } });
  };

  // TODO : 똑같은 상품 나올 시 앞으로 빼주는거
  getRandomProduct = (_id) => {
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

      _id = RANDOM_0_MAX();
    }

    return Object.assign(randomProduct, { id: _id }); // 가져온 product에 id 갱신해서 리턴(바뀔수도있으므로)
  };

  onClickRandom = () => {
    const randomProduct = this.getRandomProduct(RANDOM_0_MAX());
    const assignedProduct = Object.assign(randomProduct, { unlike: false }); // 가져온 product에 unlike값할당
    this.setState({ product: { ...this.state.product, ...assignedProduct } }); // newProduct setState
    updateProduct(assignedProduct); // ls에 product 정보 갱신
    saveStore('recentViewed', assignedProduct); // ls에 최근이력 추가
  };

  onClickUnlike = () => {
    const randomProduct = this.getRandomProduct(RANDOM_0_MAX());
    const assignedProduct = Object.assign(randomProduct, { unlike: true });
    this.setState({ product: { ...this.state.product, ...assignedProduct } });
    updateProduct(assignedProduct);
    saveStore('recentViewed', assignedProduct);
  };

  render() {
    const { title, brand, price } = this.state.product;

    return (
      <Container>
        <RandomButton ref={this.randomRef}>랜덤</RandomButton>
        <UnlikeButton ref={this.unlikeRef}>관심없음</UnlikeButton>
        <div className='ProductCard'>
          <h3>{title}</h3>
          <h3>{brand}</h3>
          <h3>{price}</h3>
        </div>
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
