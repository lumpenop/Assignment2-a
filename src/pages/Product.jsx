import React, { Component, createRef } from 'react';
import { fetchGet } from '../utils/fetches';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { getStore, updateProduct, pushRecentList, isExpired } from '../utils/storage';
import { RANDOM_0_MAX, CARD_WRAP_SIZE } from '../utils/config';
import ProductCard from '../components/ProductCard';
import iconsX from '../components/images/icons_X.png';
import iconsNextBtn from '../components/images/icons_nextBlue.png';

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

  componentDidUpdate() {
    isExpired() && this.fetchProducts();
  }

  fetchProducts = async (_id) => {
    if (!getStore('productList').length) {
      const res = await fetchGet(`http://localhost:3000/data/productData.json`);
      const products = await res.json();
      localStorage.setItem(
        'productList',
        JSON.stringify(
          products.map((el, idx) =>
            Object.assign({ id: idx, unlike: false }, el)
          )
        )
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
    while (true) {
      let newProduct = getStore('productList')[_id];

      if (this.state.product.id === _id || newProduct.unlike === true) {
        _id = RANDOM_0_MAX();
        newProduct = getStore('productList')[__dirname];
        continue;
      } else return Object.assign(newProduct, { id: _id, unlike: _unlike });
    }
  };

      if (this.state.product.id === _id || newProduct.unlike === true) {
        _id = RANDOM_0_MAX();
        newProduct = getStore('productList')[__dirname];
        continue;
      } else return Object.assign(newProduct, { id: _id, unlike: _unlike });
    }
  };

  setProduct = (_product) => {
    this.setState({ product: { ...this.state.product, ..._product } });
    updateProduct(_product);
    pushRecentList(_product);
  };

  onClickRandom = () => this.setProduct(this.getProduct(RANDOM_0_MAX(), false));
  onClickUnlike = () => this.setProduct(this.getProduct(RANDOM_0_MAX(), true));

  render() {
    return (
      <Container>
        {this.state.product.id}
        <ProductCard product={this.state.product} />
        <RandomButton ref={this.randomRef}>
          <IconsNextBtn />
        </RandomButton>
        <UnlikeButton ref={this.unlikeRef}>
          <IconsX />
        </UnlikeButton>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  width: ${CARD_WRAP_SIZE}px;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  position: absolute;
  top: ${CARD_WRAP_SIZE * 0.04}px;
  right: ${CARD_WRAP_SIZE * 0.03}px;
`;

const UnlikeButton = styled(StyledButton)``;

const RandomButton = styled(StyledButton)`
  top: ${CARD_WRAP_SIZE * 0.8}px;
  right: ${CARD_WRAP_SIZE * 0.075}px;
`;

const IconsX = styled.img.attrs({
  src: iconsX,
})`
  width: ${CARD_WRAP_SIZE * 0.2}px;
  height: ${CARD_WRAP_SIZE * 0.18}px;
  filter: invert(100%) drop-shadow(0 0 0 black);
  &:hover {
    filter: invert(40%);
  }
`;
const IconsNextBtn = styled.img.attrs({
  src: iconsNextBtn,
})`
  width: ${CARD_WRAP_SIZE * 0.2}px;
  height: ${CARD_WRAP_SIZE * 0.2}px;
  filter: opacity(0.9) drop-shadow(0 0 0 blue);
  &:hover {
    filter: opacity(0.7) drop-shadow(0 0 0 #0067a3);
  }
`;
