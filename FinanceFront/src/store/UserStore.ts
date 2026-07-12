import { create } from "zustand";

type UserStore = {
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (id) => set({ selectedUserId: id }),
}));