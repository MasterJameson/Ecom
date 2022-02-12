import styled from 'styled-components'

export const SelectedImg = styled.img`
  float:left;
  width: 450px;
  height: 500px;
  margin-right: 20px;
  `
export const SelectedMainDiv = styled.div`
  width: 100%;
  `
export const QuantityText = styled.h4`
margin: 10px 0;
  `
export const OptionDiv = styled.div`
    float: left;
    text-align: center;
  `
export const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
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
export const SubmitButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  margin-right: 10px;
  font-size:15px;
  cursor: pointer;
  &:focus{
    outline: none;
    background-color: #b9b9b9;
    color: #fff
  }
  `