import {createSlice} from '@reduxjs/toolkit'
import { fetchCartDetails, fetchCartTotal, fetchUser } from '../utils/fetchLocalStorageData';

const userDets=fetchUser();
const cartDets=fetchCartDetails();
const cartAmount=fetchCartTotal();
console.log("Cart details from local storage",cartDets);
const initialState={
    user:userDets,
    status:userDets?true:false,
    storeItems:null,
    cartShow:false,
    cartItems:cartDets,
    cartTotal:cartAmount

}


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.user=action.payload;
        },
        logout:(state,action)=>{
            state.status=false;
            state.user=null;
        },
        updateItemsList:(state,action)=>{
            state.storeItems=action.payload;
        },
        updateCartShow:(state,action)=>{
            state.cartShow=action.payload
        },
        addCartItem:(state,action)=>{

            state.cartItems.push(action.payload);
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            // localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            
        },
        updateCartItem:(state,action)=>{
            state.cartItems=state.cartItems.map((item)=>item.id==action.payload.id?action.payload:item);
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            // localStorage.setItem("cartTotal",JSON.stringify(state.cartTotal));
        },
        removeCartItem:(state,action)=>{
            // console.log("remobinf from  : ",action.payload)
            state.cartItems=state.cartItems.filter((item)=>item.id!=action.payload);
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            // localStorage.setItem("cartTotal",JSON.stringify(state.cartTotal));
        },
        updateCartTotal:(state,action)=>{
            if(action.payload.task=="add")
            {
                state.cartTotal+=Number(action.payload.price);
            }
            else
            {
                state.cartTotal-=Number(action.payload.price);
            }
            
            localStorage.setItem("cartTotal",JSON.stringify(state.cartTotal));

        },
        clearCart:(state,action)=>{
            state.cartItems=[];
            state.cartTotal=0;
            localStorage.setItem("cartItems",JSON.stringify([]));           
             localStorage.setItem("cartTotal",JSON.stringify(state.cartTotal));

        }
    }
})

export default authSlice.reducer;

export const {login,logout,updateItemsList,updateCartShow,addCartItem,updateCartItem,removeCartItem,updateCartTotal,clearCart}=authSlice.actions;