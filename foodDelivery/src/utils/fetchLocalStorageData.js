export const fetchUser=()=>{
    
        const userDets=localStorage.getItem('user')!==null?
    JSON.parse(localStorage.getItem('user')):localStorage.clear()
    console.log("userDets from local storage : ",userDets)
    return userDets;
    
}
