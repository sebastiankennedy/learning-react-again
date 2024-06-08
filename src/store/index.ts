import {create} from "zustand";
import {User} from "@/types/api";

export const useStore = create<{
  token: string,
  updateToken: (token: string) => void,

  userInfo: {
    userEmail: string,
    userName: string,
  },
  updateUserInfo: (userInfo: User.UserItem) => void,

  collapsed: boolean,
  updateCollapsed: () => void,
}>(set => ({
  token: '',
  updateToken: token => set({token}),

  userInfo: {
    userEmail: '',
    userName: '',
  },
  updateUserInfo: (userInfo: User.UserItem) => set({userInfo}),

  collapsed: false,
  updateCollapsed: () => set(state => {
    return {
      collapsed: !state.collapsed
    }
  })
}))
