import { ProductType, SubProduct } from "../list_item/type";
import { SELECTED_ITEM, SHOW_COMPONENT, ADDTO_CART, CLEAR_ITEM, DELETE_ITEM, SORT_SIZE, SORT_STATE, SORT_LIST, CLEAR_CART } from "./string";



export const clearCart = (data: SubProduct) => {
  return {
    type: CLEAR_CART,
    cart: data
  }
}
export const sortState = (data: string) => {
  return {
    type: SORT_STATE,
    state: data
  }
}

export const sortProduct = (data: SubProduct) => {
  return {
    type: SORT_LIST,
    list: data
  }
}
export const sortSize = (data: SubProduct) => {
  return {
    type: SORT_SIZE,
    size: data
  }
}
export const deleteItem = (data: SubProduct) => {
  return {
    type: DELETE_ITEM,
    delete: data
  }
}

export const selectItem = (data: ProductType) => {
  return {
    type: SELECTED_ITEM,
    selected: data
  }
}

export const showComponent = (data: boolean) => {
  return {
    type: SHOW_COMPONENT,
    show: data
  }
}

export const addToCart = (data: SubProduct) => {
  return {
    type: ADDTO_CART,
    add: data
  }
}

export const clearItem = (data: ProductType) => {
  return {
    type: CLEAR_ITEM,
    clear: data
  }
} 