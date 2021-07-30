import React, { Component } from 'react';
import styled from 'styled-components';
import samplePng from './images/sample1.png';
import iconsX from './images/icons_X.png';
import iconsNextBtn from './images/icons_nextBlue.png';

class ProductCard extends Component {
  render() {
    const data = {
      title: "중고 나이키 테아 흰검 245 30000원",
      brand: "나이키",
      price: 30000,
  
    }

    const ImgBox = styled.div`
      text-align: center;
      position: relative;
      width: 180px;
      height: 180px;
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
    // const IconsX = styled.img.attrs({
    //   src: iconsX,
    // })`
    //   width: 38px;
    //   height: 35px;
    //   position: absolute;
    //   top: 8px;
    //   right: 6px;
    //   filter: invert(100%) drop-shadow(0 0 0 black);
    //   &:hover{
    //     filter: invert(40%);
    //   }
    // `
    // const IconsNextBtn = styled.img.attrs({
    //   src: iconsNextBtn,
    // })`
    //   width: 40px;
    //   height: 40px;
    //   position: absolute;
    //   bottom: -20px;
    //   right: 15px;
    //   filter: opacity(0.9) drop-shadow(0 0 0 blue);
    //   &:hover {
    //     filter: opacity(0.70) drop-shadow(0 0 0 #0067A3);
    //   }
    // `
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
      width: 90%;
      margin: 0 auto;

    `
    const CardContents = styled.div`
      width:90%;
      display: inline-block;
    `
    const CardWrap = styled.div`
      width: 40%;
      margin: 20px auto 0;
    `
    return (
      <>
        <CardWrap>
          <ImgBox>
            <IconsX />
            <ImgSample />
            <IconsNextBtn />
          </ImgBox>
          <CardContentsContainer>
            <CardContents>
              <CardPrice>
                가격 : {data.price/10000}만원
              </CardPrice>
              <CardBrand>
                브랜드 : {data.brand}
              </CardBrand>
              <CardTitle>
                {data.title}
              </CardTitle>
            </CardContents>
          </CardContentsContainer>
        </CardWrap>
      </>
    )
  }
}

export default ProductCard;

