import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ListItem from '../list_item'
import SelectedItem from '../selected_item'
import { SubProduct } from '../list_item/type'
import { LeftDiv, RightDiv, Container, CartImg, ListCart, DelButton, UlCart, ClearButton, UnitName, UnitQuantity, CartItem, UnitPrice, UnitSize, CheckOutButton } from './style'
import { deleteItem, selectItem, showComponent, clearCart } from '../redux/action'

const Dashboard = () => {

  const dispatch: any = useDispatch();

  const showItem = useSelector((state: any) => state.showComponent)

  const cartList = useSelector((state: any) => state.cartList)

  const index = cartList.findIndex((item: SubProduct) => item.id)

  const Total = index === 0 ? (cartList.map((item: any) => item.subTotal).reduce((a: number, b: number) => a + b)) : 0
  // index === 0 ? shit.reduce((a: number, b: number) => a + b) : 0

  const handleDel = (val: SubProduct) => {
    dispatch(deleteItem(val))
  }

  const updateCart = (val: SubProduct) => {
    if (!showItem) {
      const addTask = {
        id: val.id,
        stock: val.stock,
        price: val.price,
        size: val.size,
        quantity: val.quantity,
        unitName: val.unitName,
        image: val.image,
      }
      dispatch(selectItem(addTask))
      dispatch(showComponent(true))
    }

  }

  const handleClearCart = () => {
    const clear = cartList.map((val: SubProduct) => val)
    dispatch(clearCart(clear))
  }


  return (
    <div>
      <Container>
        <LeftDiv>
          {
            showItem
              ? <SelectedItem />
              : <ListItem />
          }
        </LeftDiv>
        <RightDiv>
          <CartItem>Cart Items: {cartList.length}</CartItem>
          {
            cartList.map((val: SubProduct) => {
              return (
                <React.Fragment key={val.id} >
                  <div >
                    <UlCart>
                      <ListCart onClick={() => updateCart(val)}><CartImg src={val.image} alt="" /></ListCart>
                      <ListCart>
                        <UnitName>{val.unitName}</UnitName>
                        <UnitSize>{val.size} |</UnitSize>
                        <UnitQuantity>Quantity: {val.quantity}</UnitQuantity>
                      </ListCart>
                      <ListCart>
                        <DelButton onClick={() => handleDel(val)}>X</DelButton>
                        <UnitPrice>$ {val.subTotal}</UnitPrice>
                      </ListCart>
                    </UlCart>
                  </div>
                </React.Fragment>
              )
            })
          }
          <h5>Total: ${Total}</h5>
          <CheckOutButton onClick={handleClearCart}>CHECKOUT</CheckOutButton>
          <ClearButton onClick={handleClearCart}>Clear cart</ClearButton>
        </RightDiv>
      </Container>

    </div>
  )
}

export default Dashboard
