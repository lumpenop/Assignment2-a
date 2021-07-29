import React, { Component } from 'react';
import styled from 'styled-components';
import { fetchGet } from '../utils/fetches';

export default class RecentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentList: [],
      brandList: [],
      viewList: [],
    };
    this.handleClickBrand = (e) => {
      const clickedBrand = e.target.innerText;
      if (clickedBrand === '전체브랜드') {
        this.setState({ viewList: this.state.recentList });
      } else {
        this.setBrandList(clickedBrand);
      }
    };
    this.setBrandList = (brandName) => {
      const { recentList } = this.state;

      const brandfilteredList = recentList.filter(
        (card) => card.brand === brandName
      );
      this.setState({ viewList: brandfilteredList });
    };
  }
  componentDidMount() {
    fetchGet('data/productData.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ recentList: data.slice(0, 10) });
        this.setState({ viewList: data.slice(0, 10) });
        this.setState({
          brandList: [
            '전체브랜드',
            ...new Set(this.state.recentList.map((card) => card['brand'])),
          ],
        });
      });
  }
  render() {
    const { brandList, viewList } = this.state;

    return (
      <RecentListDiv>
        <BrandButtonDiv>
          {brandList.map((brandName, idx) => (
            <BrandButton key={idx} onClick={(e) => this.handleClickBrand(e)}>
              {brandName}
            </BrandButton>
          ))}
        </BrandButtonDiv>
        {viewList.map((card, idx) => {
          const { brand, price, title } = card;
          return (
            <ProductCardDiv key={idx}>
              {brand} {price} {title}
            </ProductCardDiv>
          );
        })}
      </RecentListDiv>
    );
  }
}

const RecentListDiv = styled.div``;
const ProductCardDiv = styled.div`
  width: 200px;
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
