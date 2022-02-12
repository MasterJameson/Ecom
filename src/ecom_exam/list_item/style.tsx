import styled from 'styled-components'

export const DivButtons = styled.div`
 width:100%;
 max-width: 12%;
 height: fit-content;
  `
export const DivItems = styled.div`
 width:100%;
 max-width: 88%
  `

export const ImgStyle = styled.img`
  width: 200px;
  height: 250px;
  `
export const Tr = styled.tr`
  display: inline-block;
  margin: 0 20px 30px 0;
  `
export const Td = styled.td`
  display: table-row
  `
export const UnitName = styled.h4`
  text-align:center;
  margin: 10px 0;
  font-weight: normal;
  `
export const SubPrice = styled.p`
  margin: 10px auto 0;
  font-weight: normal;
  font-size: 15px;
  color:gray;
  text-align:center;
  `
export const Stocks = styled.p`
  margin: 0 auto;
  font-weight: normal;
  font-size: 15px;
  color:gray;
  text-align:center;
  `
export const Price = styled.span`
  font-weight: bold;
  font-size: 25px;
  text-align:center;
  color:black;
  `
export const SmallBorder = styled.p`
  width: 20px;
  border-bottom: 1px solid #ffb861;
  margin: 0 auto;
  `
export const AddButton = styled.button`
  padding: 13px;
  width: 100%;
  margin: 10px auto 0;
  border: none;
  background-color: #13101f; 
  color: #fff;
  cursor: pointer;
  &:focus{
    outline:none;
    background-color: #ffbc00;
  }
`
export const SizeButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  margin:0 10px 10px 0;
  border-radius: 50%;
  cursor: pointer;
  &:focus{
    outline: none;
    background-color: #b9b9b9;
    color: #fff
  }
  `
export const PriceButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  &:focus{
    outline: none;
    background-color: #b9b9b9;
    color: #fff
  }
  `
export const AllItems = styled.button`
  height: 30px;
  border: none;
  font-size:15px;
  cursor: pointer;
  &:focus{
    outline: none;
    background-color: #b9b9b9;
    color: #fff
  }
  `

