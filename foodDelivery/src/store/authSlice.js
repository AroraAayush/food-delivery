import {createSlice} from '@reduxjs/toolkit'
import { fetchUser } from '../utils/fetchLocalStorageData';

const userDets=fetchUser();
console.log(userDets);
const initialState={
    user:userDets,
    status:userDets?true:false
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
        }
    }
})

export default authSlice.reducer;

export const {login,logout}=authSlice.actions;