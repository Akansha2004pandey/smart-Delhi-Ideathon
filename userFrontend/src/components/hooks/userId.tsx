import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useUserIdStore {
    userId: string;
    setUserId: (userId: string) => void;
    anonymous: boolean;
    setAnonymous: (anonymous: boolean) => void;
}

export const useUserIdStore = create(
    persist<useUserIdStore>(
        (set) => ({
            userId: "",
            setUserId: (userId) => set({ userId }),
            anonymous: true,
            setAnonymous: (anonymous) => set({ anonymous }),
        }),
        {
            name: "user-id-store", 
            partialize: (state) => ({ userId: state.userId, anonymous: state.anonymous }), 
        }
    )
);
