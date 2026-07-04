import { create } from "zustand";
import type { Notification } from "../Interfaces/Notification";

type Store = {
  list: Notification[];
  showError: (msg: string) => void;
  showSuccess: (msg: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const MAX_VISIBLE = 5;

let timer: ReturnType<typeof setTimeout> | null = null;

export const useNotificationStore = create<Store>((set, get) => ({
  list: [],

  showError: (message) => {
    const id = Date.now().toString();

    set((state) => {
      const newList = [...state.list, { id, message, type: "error" as const }];

      return {
        list: newList.slice(0, MAX_VISIBLE),
      };
    });

    processQueue(get, set);
  },

  showSuccess: (message) => {
    const id = Date.now().toString();

    set((state) => {
      const newList = [...state.list, { id, message, type: "success" as const}];

      return {
        list: newList.slice(0, MAX_VISIBLE),
      };
    });

    processQueue(get, set);
  },

  remove: (id) => {
    set((state) => ({
      list: state.list.filter((n) => n.id !== id),
    }));

    processQueue(get, set);
  },

  clear: () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    set({ list: [] });
  },
}));

function processQueue(get: any, set: any) {
  if (timer) return;

  const state = get();
  if (state.list.length === 0) return;

  const current = state.list[0];

  timer = setTimeout(() => {
    set((state: Store) => {
      const updated = state.list.filter((n) => n.id !== current.id);

      return {
        list: updated,
      };
    });

    timer = null;

    processQueue(get, set);
  }, 3000);
}