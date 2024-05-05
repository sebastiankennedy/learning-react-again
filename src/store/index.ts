import {create} from "zustand";
import {User} from "@/types/api";

export const useStore = create<{
  token: string,
  userInfo: {
    userEmail: string,
    userName: string,
  },
  updateToken: (token: string) => void,
  updateUserInfo: (userInfo: User.UserItem) => void,
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: '',
  },
  updateToken: token => set({token}),
  updateUserInfo: (userInfo: User.UserItem) => set({userInfo}),
}))
