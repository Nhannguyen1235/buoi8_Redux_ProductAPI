import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlide from "./productSlide";


const store = configureStore({
    reducer:{
        carts: cartSlice,
        products: productSlide
    }
})
export default store