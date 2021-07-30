import React, { Component } from 'react';
import styled from 'styled-components';
import { getStore } from '../utils/storage';

export default class RecentList extends Component {
  state = {
    recentProducts: getStore('recentViewed'),
    recentFiltered: getStore('recentViewed'),
    brandList: [
      '전체브랜드',
      ...new Set(getStore('recentViewed').map((card) => card['brand'])),
    ],
    isUnlike: true,
  };

  brandFiltered = (brandName) => {
    const { recentProducts } = this.state;
    const brandfilteredList = recentProducts.filter(
      (card) => card.brand === brandName
    );
    this.setState({ recentFiltered: brandfilteredList });
  };

  unlikeFiltered = (isChecked) => {
    const { recentProducts, recentFiltered } = this.state;
    if (isChecked) {
      const unlikeFilteredList = recentFiltered.filter(
        (card) => card.unlike === false
      );
      this.setState({ recentFiltered: unlikeFilteredList });
    } else {
      this.setState({ recentFiltered: recentProducts });
    }
  };

  brandClicked = (e) => {
    const clickedBrand = e.target.innerText;
    if (clickedBrand === '전체브랜드') {
      this.setState({ recentFiltered: this.state.recentProducts });
    } else {
      this.brandFiltered(clickedBrand);
    }
  };

  unlikeChecked = (e) => {
    const isChecked = e.target.checked;
    this.unlikeFiltered(isChecked);
  };

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    const { recentFiltered, brandList } = this.state;
    return (
      <RecentListDiv>
        <BrandButtonDiv>
          {brandList.map((brandName, idx) => (
            <BrandButton key={idx} onClick={(e) => this.brandClicked(e)}>
              {brandName}
            </BrandButton>
          ))}
          <UnlikeDiv>
            <UnlikeCheckBox onChange={(e) => this.unlikeChecked(e)} />
            관심없는 상품 숨기기
          </UnlikeDiv>
        </BrandButtonDiv>
        {recentFiltered.map((recentProduct, idx) => {
          const { brand, price, title } = recentProduct;
          return (
            <ProductCardDiv key={idx}>
              <h3>{title}</h3>
              <h3>{brand}</h3>
              <h3>{price}</h3>
            </ProductCardDiv>
          );
        })}
      </RecentListDiv>
    );
  }
}

const RecentListDiv = styled.div``;
const ProductCardDiv = styled.div`
  width: fit-content;
  height: 100px;
  background-color: skyblue;
`;

const BrandButtonDiv = styled.div`
  display: flex;
`;
const BrandButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: #fff;
  background-color: #353535;
  :hover {
    color: #000;
    background-color: #fff;
    transition: 0.5s;
    border: 1px solid #000;
  }
`;

const UnlikeDiv = styled.div``;

const UnlikeCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  border-radius: 5px;
  color: red;
`;
