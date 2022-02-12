import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tr, Td, ImgStyle, SizeButton, PriceButton, AllItems, DivItems, DivButtons, UnitName, SmallBorder, SubPrice, Price, Stocks, AddButton } from './style';
import { ProductType, SubProduct } from './type';
import { selectItem, showComponent, sortState, sortSize, sortProduct } from '../redux/action';

const ListItem = () => {

  const dispatch: any = useDispatch();

  const productList = useSelector((state: any) => state.productList)

  const cartList = useSelector((state: any) => state.cartList)

  const handleItem = (val: ProductType) => {
    const addTask = {
      id: val.id,
      stock: val.stock,
      price: val.price,
      size: val.size,
      quantity: val.quantity,
      unitName: val.unitName,
      image: val.image,
    }

    if (cartList.length !== 0) {
      cartList.filter((item: SubProduct) => {
        if (item.id === val.id) {
          const addTask2 = {
            id: val.id,
            stock: val.stock,
            price: val.price,
            size: val.size,
            quantity: item.quantity,
            unitName: val.unitName,
            image: val.image,
          }
          dispatch(selectItem(addTask2))
          dispatch(showComponent(true))
        }
        return item
      })
    }

    const index: number = cartList.findIndex((item: SubProduct) => item.id === val.id)

    if (index > -1) return []
    dispatch(selectItem(addTask))
    dispatch(showComponent(true))
    dispatch(sortState('Default'))
  }

  const sortList = useSelector((state: any) => state.sortItem)
  const sortString = useSelector((state: any) => state.sortState)

  const handleHighest = () => {
    if (sortString === 'Default') {
      const sortHighest = productList.filter((val: ProductType) => val.price).sort((a: ProductType, b: ProductType) => {
        const sortA = a.price.toString(), sortB = b.price.toString()
        return sortB.localeCompare(sortA)
      })
      dispatch(sortProduct(sortHighest))
    } else {
      const sortHighest = sortList.filter((val: ProductType) => val.price).sort((a: ProductType, b: ProductType) => {
        const sortA = a.price.toString(), sortB = b.price.toString()
        return sortB.localeCompare(sortA)
      })
      dispatch(sortSize(sortHighest))
    }
  }
  const handleLowest = () => {
    if (sortString === 'Default') {
      const sortHighest = productList.filter((val: ProductType) => val.price).sort((a: ProductType, b: ProductType) => {
        const sortA = a.price.toString(), sortB = b.price.toString()
        return sortA.localeCompare(sortB)
      })
      dispatch(sortProduct(sortHighest))
    } else {
      const sortHighest = sortList.filter((val: ProductType) => val.price).sort((a: ProductType, b: ProductType) => {
        const sortA = a.price.toString(), sortB = b.price.toString()
        return sortA.localeCompare(sortB)
      })
      dispatch(sortSize(sortHighest))
    }
  }
  const handleSmall = () => {
    const handleSize = productList.map((item: ProductType) => item).filter((val: ProductType) => val.size === 'S')
    dispatch(sortState('S'))
    dispatch(sortSize(handleSize))
  }
  const handleMedium = () => {
    const handleSize = productList.map((item: ProductType) => item).filter((val: ProductType) => val.size === 'M')
    dispatch(sortState('M'))
    dispatch(sortSize(handleSize))
  }
  const handleLarge = () => {
    const handleSize = productList.map((item: ProductType) => item).filter((val: ProductType) => val.size === 'L')
    dispatch(sortState('L'))
    dispatch(sortSize(handleSize))
  }
  const handleDefaultItems = () => {
    dispatch(sortState('Default'))
  }

  return (
    <React.Fragment>
      <DivButtons>
        <p>
          <AllItems onClick={handleDefaultItems}>All Items</AllItems>

        </p>
        <div>
          <h3>Prices:</h3>
          <PriceButton onClick={handleHighest}>&#8593;</PriceButton>
          <PriceButton onClick={handleLowest}>&#8595;</PriceButton>
          <h3>Sizes:</h3>
          <SizeButton onClick={handleSmall}>S</SizeButton>
          <SizeButton onClick={handleMedium}>M</SizeButton>
          <SizeButton onClick={handleLarge}>L</SizeButton>
        </div>
      </DivButtons>
      <DivItems>
        {
          sortString === 'Default' ? productList.length : sortList.length
        }
        <span> Product(s) found</span>
        <table>
          <tbody>
            {
              sortString === 'Default'
                ?
                productList.map((val: ProductType) => {
                  return (
                    <Tr key={val.id}>
                      <Td key={val.id}><ImgStyle src={val.image} alt="" /></Td>
                      <Td><UnitName>{val.unitName}</UnitName></Td>
                      <Td><SmallBorder></SmallBorder></Td>
                      <Td><SubPrice>$<Price>{val.price}</Price>.00</SubPrice></Td>
                      <Td><Stocks>Stocks: {val.stock}</Stocks></Td>
                      <Td><AddButton onClick={() => handleItem(val)}>Add to cart</AddButton></Td>
                    </Tr>
                  )
                })
                :
                (
                  sortList.map((val: ProductType) => {
                    return (
                      <Tr key={val.id}>

                        <Td><ImgStyle src={val.image} alt="" /></Td>
                        <Td><UnitName>{val.unitName}</UnitName></Td>
                        <Td><SmallBorder></SmallBorder></Td>
                        <Td><SubPrice>$ <Price>{val.price}</Price>.00</SubPrice></Td>
                        <Td><Stocks>Stocks: {val.stock}</Stocks></Td>
                        <Td><AddButton onClick={() => handleItem(val)}>Add to cart</AddButton></Td>
                      </Tr>
                    )
                  })
                )


              // < tr >
              // <td>sort</td>
              // </tr>
            }
          </tbody>
        </table>

      </DivItems>

    </React.Fragment >
  )
}

export default ListItem
