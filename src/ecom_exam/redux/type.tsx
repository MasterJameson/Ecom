import { ProductType, SubProduct } from "../list_item/type";

export type InitStateType = {
  productList: ProductType[]
  selectedItem?: ProductType[]
  showComponent: boolean
  cartList?: SubProduct[]
  total?: number,
  sortItem?: ProductType[]
  sortState?: string
}