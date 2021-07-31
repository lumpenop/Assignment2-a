import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { getStore, isExpired } from '../utils/storage';
import ProductCard from '../components/ProductCard';
export default class RecentList extends Component {
  state = {
    recentProducts: [],
    recentFiltered: [],
    brandList: [],
  };

  lowPriceViewRef = createRef();
  highPriceViewRef = createRef();
  recentViewRef = createRef();

  componentDidMount() {
    this.setState({
      recentProducts: getStore('recentViewed'),
      recentFiltered: getStore('recentViewed'),
      brandList: this.setBrandList(),
    });
    this.lowPriceViewRef.current.addEventListener('click', this.onClickLowPriceView);
    this.highPriceViewRef.current.addEventListener('click', () => this.setHighPriceOrder());
    this.recentViewRef.current.addEventListener('click', this.onClickRecentView);
  }
  onClickLowPriceView = () => this.setLowPriceOrder();
  onClickHighPriceView = () => this.setHighPriceOrder();
  onClickRecentView = () => this.setRecentViewOrder();

  onCheckUnlike = (e) => {
    const isChecked = e.target.checked;
    this.setUnlikeFilter(isChecked);
  };

  onClickBrand = (e) => {
    const clickedBrand = e.target.innerText;
    const { brandList, recentProducts } = this.state;
    if (clickedBrand === '전체브랜드') {
      brandList.forEach((brand) => {
        if (brand.name === clickedBrand && !brand.isFilter) brand.isFilter = true;
        else if (brand.name !== clickedBrand) brand.isFilter = false;
      });
      this.setState({ recentFiltered: recentProducts });
    } else {
      brandList.forEach((brand) => {
        if (brand.name === clickedBrand) brand.isFilter = !brand.isFilter;
        if (brand.name === '전체브랜드') brand.isFilter = false;
      });
      this.setBrandFilter();
    }
  };

  onClickToProductPage = (e) => {
    const productId = e.target.closest('div').id;
    this.setIsRouting(parseInt(productId));
  };

  setIsRouting = (id) => {
    const { recentProducts } = this.state;
    recentProducts.forEach((product) => {
      if (product.id === id)
        if (product.unlike) alert('해당 상품은 관심없음 대상의 상품입니다.');
        else this.props.history.push({ pathname: `/product`, state: id });
    });
  };

  setBrandList = () => {
    const brandList = [...new Set(getStore('recentViewed').map((card) => card['brand']))];
    const brandState = brandList.map((brand) => Object.assign({ name: brand, isFilter: false }));
    brandState.unshift({ name: '전체브랜드', isFilter: true });
    return brandState;
  };

  setUnlikeFilter = (isChecked) => {
    const { recentProducts, recentFiltered } = this.state;
    if (isChecked) {
      const unlikeFilteredList = recentFiltered.filter((card) => card.unlike === false);
      this.setState({ recentFiltered: unlikeFilteredList });
    } else this.setState({ recentFiltered: recentProducts });
  };

  setBrandFilter = () => {
    const { recentProducts, brandList } = this.state;
    const filterBrand = [];
    brandList.forEach((brand) => {
      if (brand.isFilter === true) filterBrand.push(brand.name);
    });

    const filteredProducts = recentProducts.filter((card) => filterBrand.includes(card.brand));
    this.setState({
      recentFiltered: filteredProducts.length > 0 ? filteredProducts : recentProducts,
    });
  };

  setLowPriceOrder = () => {
    const { recentFiltered } = this.state;
    const lowOrderedList = recentFiltered.sort((a, b) => {
      return parseInt(a.price) - parseInt(b.price);
    });
    this.setState({ recentFiltered: lowOrderedList });
  };
  setHighPriceOrder = () => {
    const { recentFiltered } = this.state;
    const highOrderedList = recentFiltered.sort((a, b) => {
      return parseInt(b.price) - parseInt(a.price);
    });
    this.setState({ recentFiltered: highOrderedList });
  };

  setRecentViewOrder = () => {
    const { recentProducts } = this.state;
    this.setState({ recentFiltered: recentProducts });
  };

  render() {
    const { recentFiltered, brandList } = this.state;
    return (
      <RecentListDiv>
        <PageTitle>상품조회이력</PageTitle>
        <UnlikeDiv>
          <UnlikeCheckBox onChange={(e) => this.onCheckUnlike(e)} />
          관심없는 상품 숨기기
        </UnlikeDiv>
        <BrandButtonDiv>
          {brandList.map((brand, idx) => (
            <BrandButton key={idx} isFilter={brand.isFilter} onClick={(e) => this.onClickBrand(e)}>
              {brand.name}
            </BrandButton>
          ))}
        </BrandButtonDiv>
        <ViewDiv>
          <ViewLowPriceButton ref={this.lowPriceViewRef}>낮은 가격 순</ViewLowPriceButton>
          <ViewHighPriceButton ref={this.highPriceViewRef}>높은 가격 순</ViewHighPriceButton>
          <ViewRecentButton ref={this.recentViewRef}>최근 조회 순</ViewRecentButton>
        </ViewDiv>
        <RecentProductDiv>
          {recentFiltered.map((recentProduct) => {
            const { id } = recentProduct;
            return (
              <ProductCard
                key={id}
                id={id}
                product={recentProduct}
                onClick={(e) => this.onClickToProductPage(e)}
              />
            );
          })}
        </RecentProductDiv>
      </RecentListDiv>
    );
  }
}
const RecentListDiv = styled.div`
  padding: 30px;
`;

const PageTitle = styled.div`
  font-size: 30px;
  margin: 20px 0;
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

const UnlikeDiv = styled.div`
  margin: 20px 0;
  font-size: 20px;
`;

const UnlikeCheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  border-radius: 5px;
  color: red;
`;
const ViewDiv = styled.div``;
const ViewRecentButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;
const ViewLowPriceButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;
const ViewHighPriceButton = styled.button`
  margin: 10px;
  padding: 10px;
  color: ${(props) => (props.isFilter ? '#fff' : '#000')};
  background-color: ${(props) => (props.isFilter ? '#000 ' : '#fff')};
  border: 1px solid #000;
`;
const RecentProductDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
`;
