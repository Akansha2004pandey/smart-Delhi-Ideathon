import {create } from "zustand";

interface useUserIdStore {
    userId:string;
    setUserId:(userId:string)=>void;
    anonymous:boolean
    setAnonymous:(anonymous:boolean)=>void;
}

 export const useUserIdStore=create<useUserIdStore>((set)=>({
    userId:"",
    setUserId:(userId)=>{
        set({userId});
    },
    anonymous:true,
    setAnonymous:(anonymous)=>{
        set({anonymous});
    }
}));
