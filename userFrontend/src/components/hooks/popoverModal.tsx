import {create } from "zustand";

interface usePopOverModalStore {
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
export const usePopOverModalStore=create<usePopOverModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>{
        set({isOpen:true});
    },
    onClose:()=>{
        set({isOpen:false});
    }
}));
