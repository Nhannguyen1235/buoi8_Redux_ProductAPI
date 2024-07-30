import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
const url = 'https://66a07af87053166bcabb8822.mockapi.io/product'

// Tạo một thunk để fetch dữ liệu từ API
// xử lý cho api
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get(url);
    return response.data;
  });
  export const handle_deleteProductAPI = createAsyncThunk('products/deleteProduct', async (id) => {
    await axios.delete(url+'/'+ id);
    return id;
  });
  export const handle_addProductAPI = createAsyncThunk('products/addProduct', async (product) => {
     const res = await axios.post(url,product);
    return res.data;
  });
  export const handle_recheckedProductAPI = createAsyncThunk('products/recheckedProduct', async(product)=>{
    const res = await axios.put(url + '/'+ product.id,{...product,checked:!product.checked})
    return res.data;
  })

const initialState={
    products:[],
    status: 'idle',
    error: '',
}
const productSlice= createSlice({
    name:"products",
    initialState,
    reducers:{
    },
    //xử lý của trang
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProducts.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.status = 'succeeded'
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(handle_deleteProductAPI.fulfilled,(state,action)=>{
            state.products = state.products.filter(product => product.id !==action.payload)
        })
        .addCase(handle_addProductAPI.fulfilled,(state,action)=>{
            state.products = [...state.products,action.payload]
        })
        .addCase(handle_recheckedProductAPI.fulfilled,(state,action)=>{
            state.products = state.products.map(product => product.id === action.payload.id ?{...product,checked:!product.checked}:product)
        })
    }
})
export default productSlice.reducer;