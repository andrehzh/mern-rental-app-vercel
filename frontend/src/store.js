import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

/*import {
  itemListReducer,
  itemDetailsReducer,
} from "./reducers/itemReducers"; */

import {
  itemAddReducer,
  itemDetailsReducer,
  itemListReducer,
} from "./reducers/itemReducers";
// import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer } from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  itemAdd: itemAddReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  orderListMy : orderListMyReducer,
  // itemListMy : itemListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const itemInfoFromStorage = localStorage.getItem("itemInfo")
  ? JSON.parse(localStorage.getItem("itemInfo"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
? JSON.parse(localStorage.getItem('shippingAddress')) 
: {}

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
  userLogin: { userInfo: userInfoFromStorage },
  itemAdd: { itemInfo: itemInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
