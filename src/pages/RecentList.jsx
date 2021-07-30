import React, { Component } from 'react';
import styled from 'styled-components';
import { getStore } from '../utils/storage';

export default class RecentList extends Component {
  state = {
    recentProducts: [],
    recentFiltered: [],
    brandList: [],
  };

  componentDidMount() {
    const brandState = [{ name: '전체브랜드', isFilter: false }];
    const tempBrandList = [
      ...new Set(getStore('recentViewed').map((card) => card['brand'])),
    ];
    tempBrandList.map((brandName) => {
      brandState.push({ name: brandName, isFilter: false });
    });
    this.setState({
      recentProducts: getStore('recentViewed'),
      recentFiltered: getStore('recentViewed'),
      brandList: brandState,
    });
  }

  unlikeFiltered = (isChecked) => {
    const { recentProducts, recentFiltered } = this.state;
    if (isChecked) {
      const unlikeFilteredList = recentFiltered.filter(
        (card) => card.unlike === false
      );
      this.setState({ recentFiltered: unlikeFilteredList });
    } else {
      // this.brandFiltered();
      this.setState({ recentFiltered: recentProducts });
    }
  };

  unlikeChecked = (e) => {
    const isChecked = e.target.checked;
    this.unlikeFiltered(isChecked);
  };

  brandFiltered = () => {
    const { recentProducts, brandList } = this.state;
    const filterBrand = [];
    brandList.map((brand) => {
      if (brand.isFilter === true) {
        filterBrand.push(brand.name);
      }
    });

    const filteredProducts = recentProducts.filter((card) =>
      filterBrand.includes(card.brand)
    );
    this.setState({ recentFiltered: filteredProducts });
  };
  brandClicked = (e) => {
    const { brandList } = this.state;
    const clickedBrand = e.target.innerText;
    if (clickedBrand === '전체브랜드') {
      brandList.map((brand) => {
        if (brand.name === clickedBrand) {
          brand.isFilter = !brand.isFilter;
        } else {
          brand.isFilter = false;
        }
      });
      this.setState({ recentFiltered: this.state.recentProducts });
    } else {
      brandList.map((brand) => {
        if (brand.name === clickedBrand) {
          brand.isFilter = !brand.isFilter;
        }
        if (brand.name === '전체브랜드') {
          brand.isFilter = false;
        }
      });
      this.brandFiltered();
    }
  };

  componentDidUpdate() {}

  render() {
    const { recentFiltered, brandList } = this.state;
    return (
      <RecentListDiv>
        <h1>상품조회이력</h1>
        <BrandButtonDiv>
          {brandList.map((brand, idx) => (
            <BrandButton
              key={idx}
              isFilter={brand.isFilter}
              onClick={(e) => this.brandClicked(e)}
            >
              {brand.name}
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
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;

const UnlikeDiv = styled.div``;

const UnlikeCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  border-radius: 5px;
  color: red;
`;
