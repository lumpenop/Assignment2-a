import React, { useState, Component } from 'react';
import styled from 'styled-components';
import { fetchGet } from '../utils/fetches';

export default class RecentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentList: [],
    };
  }
  componentWillMount() {
    fetchGet('data/productData.json')
      .then((res) => res.json())
      .then((data) => this.setState({ recentList: data.slice(0, 10) }));
  }
  render() {
    const { recentList } = this.state;
    console.log(recentList);
    return (
      <RecentListDiv>
        {recentList.map((card) => {
          const { brand, price, title } = card;
          return (
            <ProductCardDiv>
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
