import { setDoc,doc, getDocs, query, collection, orderBy } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem=async(data)=>{
    try{
    console.log("saving item: ",data)
    const res=await setDoc(doc(firestore, "storeItems", `${Date.now()}`), data);
    console.log("Res is : ",res)
    }
    catch(e)
    {
        console.log(e.toString())
    }
    // await setDoc(doc(firestore,"storeItems",`${Date.now()}`),data,{merge:true});
}


export const fetchAllItems=async()=>{
    const items=await getDocs(query(collection(firestore,"storeItems"),orderBy("id","desc")));

    return items.docs.map((item)=>item.data());

}


export const saveOrder=async (data)=>{
try{
    const res=await setDoc(doc(firestore, "orders", `${Date.now()}`), data);

}
catch(e){
console.log("Order faileddd....")
}
}