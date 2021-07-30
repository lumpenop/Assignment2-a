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
    this.setState({
      recentProducts: getStore('recentViewed'),
      recentFiltered: getStore('recentViewed'),
      brandList: this.setBrandList(),
    });
  }

  onCheckUnlike = (e) => {
    const isChecked = e.target.checked;
    this.setUnlikeFilter(isChecked);
  };

  onClickBrand = (e) => {
    const clickedBrand = e.target.innerText;
    const { brandList } = this.state;

    if (clickedBrand === '전체브랜드') {
      brandList.forEach((brand) => {
        if (brand.name === clickedBrand && !brand.isFilter)
          brand.isFilter = true;
        else if (brand.name !== clickedBrand) brand.isFilter = false;
      });
      this.setState({ recentFiltered: this.state.recentProducts });
    } else {
      brandList.forEach((brand) => {
        if (brand.name === clickedBrand) brand.isFilter = !brand.isFilter;
        if (brand.name === '전체브랜드') brand.isFilter = false;
      });
      this.setBrandFilter();
    }
  };

  setBrandList = () => {
    const brandList = [
      ...new Set(getStore('recentViewed').map((card) => card['brand'])),
    ];
    const brandState = brandList.map((brand) =>
      Object.assign({ name: brand, isFilter: false })
    );
    brandState.unshift({ name: '전체브랜드', isFilter: false });
    return brandState;
  };

  setUnlikeFilter = (isChecked) => {
    const { recentProducts, recentFiltered } = this.state;
    if (isChecked) {
      const unlikeFilteredList = recentFiltered.filter(
        (card) => card.unlike === false
      );
      this.setState({ recentFiltered: unlikeFilteredList });
    } else this.setState({ recentFiltered: recentProducts });
  };

  setBrandFilter = () => {
    const { recentProducts, brandList } = this.state;
    const filterBrand = [];
    brandList.forEach((brand) => {
      if (brand.isFilter === true) filterBrand.push(brand.name);
    });

    const filteredProducts = recentProducts.filter((card) =>
      filterBrand.includes(card.brand)
    );
    this.setState({
      recentFiltered:
        filteredProducts.length > 0 ? filteredProducts : recentProducts,
    });
  };

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
              onClick={(e) => this.onClickBrand(e)}
            >
              {brand.name}
            </BrandButton>
          ))}
          <UnlikeDiv>
            <UnlikeCheckBox onChange={(e) => this.onCheckUnlike(e)} />
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
