import { setDoc,doc } from "firebase/firestore"
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