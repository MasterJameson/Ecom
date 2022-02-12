import { InitStateType } from "./type"
import { SELECTED_ITEM, SHOW_COMPONENT, ADDTO_CART, CLEAR_ITEM, DELETE_ITEM, SORT_SIZE, SORT_STATE, SORT_LIST, CLEAR_CART } from "./string";
// import { total } from "./action";


const initState: InitStateType = {
  productList: [
    {
      id: 1,
      stock: 15,
      price: 98,
      size: 'M',
      quantity: 0,
      unitName: 'Cat Tee Black T-Shirt',
      image: 'https://www.cropp.com/media/catalog/product/cache/85//1200x1200/a4e40ebdc3e371adff845072e1c73f37/S/E/SE248-99M-002_1.jpg',
    },
    {
      id: 2,
      stock: 20,
      price: 97,
      size: 'S',
      quantity: 0,
      unitName: 'Dark Thug Blue-Navy',
      image: 'https://media.customon.com/unsafe/1200x1200/img.customon.com/img/25225068/80499,14,2,0,34,179.99982608696,236.5712,25.000086956522,0,27de0117519daa06f1aedf5f885bf7fa/merchantimagenew/rick-ross-20-men-s-t-shirt-navy.jpg',
    },
    {
      id: 3,
      stock: 25,
      price: 96,
      size: 'M',
      quantity: 0,
      unitName: 'Sphynx Tie Dye',
      image: 'https://i.pinimg.com/originals/b5/67/21/b56721799182dd6827563b62ac1b68e7.jpg',
    },
    {
      id: 4,
      stock: 20,
      price: 88,
      size: 'L',
      quantity: 0,
      unitName: 'Skull Motif T-Shirt',
      image: 'https://www.cropp.com/media/catalog/product/cache/85//1200x1200/a4e40ebdc3e371adff845072e1c73f37/R/Q/RQ101-30X-002_1.jpg',
    },
    {
      id: 5,
      stock: 25,
      price: 99,
      size: 'L',
      quantity: 0,
      unitName: 'Baby Yoda ACDC',
      image: 'https://iteepig.com/wp-content/uploads/2019/12/baby-yoda-to-be-alone-and-listen-to-acdc-sometimes-ineed-tee-shirts-2.jpg',
    },
    {
      id: 6,
      stock: 21,
      price: 93,
      size: 'L',
      quantity: 0,
      unitName: 'Vans X Metallica',
      image: 'https://www.hotelshops.gr/media/catalog/product/cache/2/thumbnail/9df78eab33525d08d6e5fb8d27136e95/v/a/vans-vans-x-metallica-black-va3hsvblk-1810302-1-l-hotelshops.gr-2.jpg',
    },
    {
      id: 7,
      stock: 21,
      price: 77,
      size: 'S',
      quantity: 0,
      unitName: 'Marsherum Queen',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61wkdqG50VL._UL1200_.jpg',
    },
    {
      id: 8,
      stock: 21,
      price: 88,
      size: 'S',
      quantity: 0,
      unitName: 'Black Sparkle Penguin',
      image: 'https://i.pinimg.com/originals/db/92/50/db9250907e23b9de99200528840f8102.jpg',
    },
    {
      id: 9,
      stock: 21,
      price: 83,
      size: 'S',
      quantity: 0,
      unitName: 'Imagin Dragons TOTW',
      image: 'https://i.pinimg.com/originals/cb/15/37/cb15372183e550bde68657761e2289b1.jpg',
    },
    {
      id: 10,
      stock: 21,
      price: 97,
      size: 'M',
      quantity: 0,
      unitName: 'Grim Ripper Longsleeve',
      image: 'https://i.pinimg.com/originals/d5/15/b6/d515b6f48aa63592a5b4c80d66ec9aa8.jpg',
    },
  ],
  selectedItem: [],
  showComponent: false,
  cartList: [],
  total: 0,
  sortItem: [],
  sortState: 'Default'
}

const reducer = (state: any = initState, action: any) => {
  switch (action.type) {

    case CLEAR_CART:
      state = {
        ...state,
        cartList: state.cartList.filter((val: any) => {
          return val.id === action.cart.id
        })
      }
      return state;

    case SELECTED_ITEM:
      state = {
        ...state,
        selectedItem: [...state.selectedItem, action.selected],
      }
      return state;

    case SHOW_COMPONENT:
      state = {
        ...state,
        showComponent: action.show
      }
      return state;

    case ADDTO_CART:
      state = {
        ...state,
        cartList: [...state.cartList.filter((val: any) => {
          if (val.id !== action.add.id) {
            return [...state.cartList, action.add]
          } return false
        }), action.add],
      }
      return state;

    case CLEAR_ITEM:
      state = {
        ...state,
        selectedItem: state.selectedItem.filter((val: any) => {
          return val.id === action.id
        }),
      }
      return state;

    case DELETE_ITEM:
      state = {
        ...state,
        cartList: state.cartList.filter((item: any) => {
          return item.id !== action.delete.id
        }),
      }
      return state;

    case SORT_STATE:
      state = {
        ...state,
        sortState: action.state,
      }
      return state;

    case SORT_SIZE:
      state = {
        ...state,
        sortItem: action.size
      }
      return state;

    case SORT_LIST:
      state = {
        ...state,
        productList: action.list
      }
      return state;

    default:
      return state;
  }
}

export default reducer
