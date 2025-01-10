import {create } from "zustand";

interface useAddDetailModalStore {
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
export const useAddDetailModalStore=create<useAddDetailModalStore>((set)=>({
    isOpen:false,
    onOpen:()=>{
        set({isOpen:true});
    },
    onClose:()=>{
        set({isOpen:false});
    }
}));
