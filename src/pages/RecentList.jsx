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
  };

  brandFiltered = (brandName) => {
    const { recentProducts } = this.state;
    const brandfilteredList = recentProducts.filter(
      (card) => card.brand === brandName
    );
    this.setState({ recentFiltered: brandfilteredList });
  };

  brandClicked = (e) => {
    const clickedBrand = e.target.innerText;
    if (clickedBrand === '전체브랜드') {
      this.setState({ recentFiltered: this.state.recentProducts });
    } else {
      this.brandFiltered(clickedBrand);
    }
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
  background-color: black;
  :hover {
    color: #000;
    background-color: #fff;
    transition: 0.5s;
    border: 1px solid #000;
  }
`;
