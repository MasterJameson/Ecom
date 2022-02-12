import styled from 'styled-components';



export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1420px;
  margin: 50px auto;
  `
export const LeftDiv = styled.div`
  width: 65%;
  display: contents;
  `
export const RightDiv = styled.div`
  width: 35%;
  height: fit-content;
  padding: 17px;
  background-color: #13101fe6;
  color: gray;
  `
export const CartItem = styled.h4`
  color: #fff;
  `
export const CartImg = styled.img`
  height: 75px;
  width: 60px;
  cursor: pointer;
  `
export const ListCart = styled.li`
  float: left;
  font-size: 14px;
  list-style-type: none;
  &:last-child{
    width: 37px;
    float: right;
  },
  &:first-child{
    margin-right: 10px;
  }
  `
export const UlCart = styled.ul`
  padding: 10px 0 0 ;
  overflow: hidden;
  border-top: 2px solid #000;
  `

export const ClearButton = styled.button`
  padding: 13px;
  width: 100%;
  margin: 10px auto 0;
  border: none;
  background-color: #13101f; 
  color: #fff;
  cursor: pointer;
  &:active{
    outline:none;
    background-color: red;
  }
`
export const CheckOutButton = styled.button`
  padding: 13px;
  width: 100%;
  margin: 10px auto 0;
  border: none;
  background-color: #13101f; 
  color: #fff;
  cursor: pointer;
  &:active{
    outline:none;
    background-color: green;
  }
`
export const DelButton = styled.button`
  border:none;
  background: none!important;
  font-weight: bold;
  cursor: pointer;
`
export const UnitName = styled.p`
  margin: 0;
  color: #fff;
`
export const UnitPrice = styled.p`
  margin: 0;
  color: #ffbc00;
`
export const UnitQuantity = styled.p`
  margin: 0;
`
export const UnitSize = styled.p`
  margin: 0;
`
