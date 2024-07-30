import {createSlice} from '@reduxjs/toolkit'

const initialState={
    carts:[
        
    ],
    checkAll:false
}
const cartSlice= createSlice({
    name:"carts",
    initialState,
    reducers:{
        addCart(state, action){
            state.carts=[...state.carts,{id:action.payload.id,name:action.payload.name,price:action.payload.price,checked:true}]
        },
        deleteCart(state,action){
            state.carts = state.carts.filter(item=>item.id !== action.payload)
        },
        clearCart(state){
            state.carts = []
        }
    }
})
export const {addCart,deleteCart,clearCart,carts}= cartSlice.actions
export default cartSlice.reducer;