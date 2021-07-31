import React, { Component } from 'react';
import styled from 'styled-components';
import samplePng from './images/sample1.png';


class ProductCard extends Component {
  static defaultProps = {
    product:{
      title:"중고 나이키 테아 흰검 245 30000원",
      price: 30000,
      brand: "나이키",
    }
  };
  
  render() {
    const ImgBox = styled.div`
      text-align: center;
      position: relative;
      width: 180px;
      height: 180px;
      margin: 0 auto;
    `
    const ImgSample = styled.img.attrs({
      src: samplePng,
    })`
      width: 180px;
      height: 180px;
      &:active{
        width: 240px;
        height: 240px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(12.5%);
        z-index: 9999;
      }
      border-radius: 12px;
      line-height: 200px;
    `
    
    const CardTitle = styled.h2`
      font-size: 14px;
      color: #777;
    `
    const CardPrice = styled.p`
      font-size: 14px;
      margin-bottom: 4px;
      font-weight: bold;
    `
    const CardBrand = styled.p`
      font-size: 14px;
      margin-bottom: 4px;
    `
    const CardContentsContainer = styled.div`
      width: 200px;
      margin: 0 auto;

    `
    const CardContents = styled.div`
      width:180px;
      padding: 4px;
      margin: 0 auto;
    `
    const CardWrap = styled.div`
      width: 200px;
      margin: 20px auto 0;
      position: relative;
    `
    return (
    
        <CardWrap>
          <ImgBox>
            {/* <IconsX /> */}
            <ImgSample />
            {/* <IconsNextBtn /> */}
          </ImgBox>
          <CardContentsContainer>
            <CardContents>
              <CardPrice>
                가격 : {this.props.product.price/10000}만원
              </CardPrice>
              <CardBrand>
                브랜드 : {this.props.product.brand}
              </CardBrand>
              <CardTitle>
                {this.props.product.title}
              </CardTitle>
            </CardContents>
          </CardContentsContainer>
        </CardWrap>
  
    )
  }
}

export default ProductCard;

