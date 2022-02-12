import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ProductType, SubProduct } from '../list_item/type'
import { showComponent, addToCart, clearItem } from '../redux/action';
import { SelectedImg, SelectedMainDiv, OptionDiv, QuantityText, SubmitButton, QuantityButton } from './style';

const SelectedItem = () => {

  const dispatch: any = useDispatch();

  const selectedItem = useSelector((state: any) => state.selectedItem)

  const [quantity, setQuantity] = React.useState(selectedItem[0].quantity)

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => { setQuantity(quantity - 1) }

  const handleAdd = (val: any) => {
    const addItem: SubProduct = {
      id: val.id,
      price: val.price,
      size: val.size,
      stock: val.stock,
      quantity: quantity,
      unitName: val.unitName,
      image: val.image,
      subTotal: val.price * quantity,
    }

    dispatch(addToCart(addItem))
    dispatch(clearItem(val))
    dispatch(showComponent(false))

    // const index = cartList.findIndex((item: SubProduct) => item.id === val.id)
    // console.log(index);
  }

  const handleCancel = (val: any) => {
    dispatch(clearItem(val))
    dispatch(showComponent(false))
  }

  return (
    <React.Fragment>
      {
        selectedItem.map((val: ProductType) => {
          return (
            <SelectedMainDiv key={val.id}>
              <SelectedImg src={val.image} alt="" />
              <OptionDiv>
                <h4>{val.unitName}</h4>
                <QuantityButton onClick={handleIncrement}>+</QuantityButton>
                <QuantityText>{quantity > val.stock ? ('Not enough stock') : (quantity)} | {val.size}</QuantityText>
                <QuantityButton
                  onClick={handleDecrement}
                  disabled={quantity === 0 ? true : false}
                >-</QuantityButton>
                <br />
                <br />
                <SubmitButton
                  onClick={() => handleAdd(val)}
                  disabled={quantity === 0 ? true : false}
                >add</SubmitButton>
                <SubmitButton
                  onClick={() => handleCancel(val)}
                >cancel</SubmitButton>
              </OptionDiv>


            </SelectedMainDiv>
          )
        })
      }
    </React.Fragment >
  )
}

export default SelectedItem
