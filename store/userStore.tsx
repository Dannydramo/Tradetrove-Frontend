import { create } from 'zustand';
import { UserProps } from '@/app/interface/user';

interface UserStoreInterface {
    user: UserProps | null;
    setUser: (vendor: UserProps | null) => void;
}

export const UserStore = create<UserStoreInterface>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
