import React, { Component } from 'react';
import styled from 'styled-components';
import samplePng from './images/sample1.png';
import {CARD_FONT_SIZE, CARD_WRAP_SIZE} from '../utils/config'

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
      width: 90%;
      height: 90%;
      margin: 0 auto;
    `;

    const ImgSample = styled.img.attrs({
      src: samplePng,
    })`
      width: 100%;
      height: 100%;
      &:active{
        width: ${CARD_WRAP_SIZE * 1.2}px;
        height: ${CARD_WRAP_SIZE * 1.2}px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(12.5%);
        z-index: 9999;
      }
      border-radius: 12px;
      line-height: ${CARD_WRAP_SIZE}px;
    `;

    const CardTitle = styled.h2`
      font-size: ${CARD_FONT_SIZE}px;
      color: #777;
    `;

    const JustP = styled.p`
      font-size: ${CARD_FONT_SIZE}px;
      margin-bottom: ${CARD_WRAP_SIZE * 0.01}%;
    `;

    const CardPrice = styled(JustP)`
      font-weight: bold;
    `;

    const CardBrand = styled(JustP)``;

    const CardWrap = styled.div`
      width: ${CARD_WRAP_SIZE}px;
      margin: 10% auto 0;
      position: relative;
    `;

    const CardContentsContainer = styled.div`
      width: 100%;
      margin: 0 auto;
    `;

    const CardContents = styled.div`
      width:90%;
      padding: ${CARD_WRAP_SIZE * 0.011}%;
      margin: 0 auto;
    `;
  
    return (
        <CardWrap>
          <ImgBox>
            <ImgSample />
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

