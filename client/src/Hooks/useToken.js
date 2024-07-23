import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useTokenStore = create(
    persist(
        (set, get) => ({
            token: "",
            setToken: (value) => set({token:value}),
        }),
        {
            name: 'token-storage'
        },
    )
)

export default useTokenStore;