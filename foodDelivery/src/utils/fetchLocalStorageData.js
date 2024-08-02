export const fetchUser=()=>{
    
        const userDets=localStorage.getItem('user')!==null?
    JSON.parse(localStorage.getItem('user')):localStorage.getItem('user')
    console.log("userDets from local storage : ",userDets)
    return userDets;
    
}


export const fetchCartDetails=()=>{
    const cartDets=localStorage.getItem('cartItems')
    if(cartDets)
    return JSON.parse(localStorage.getItem('cartItems'))
else
    return [];
    
}


export const fetchCartTotal=()=>{
    const cartDets=localStorage.getItem('cartTotal')
    if(cartDets)
    return JSON.parse(localStorage.getItem('cartTotal'))
else
    return 0;
    
}
