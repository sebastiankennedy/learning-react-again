import {create} from "zustand";
import {User} from "@/types/api";

export const useStore = create<{
  token: string,
  userInfo: User.UserItem,
  updateToken: (token: string) => void,
  updateUserInfo: (userInfo: User.UserItem) => void,
}>(set => ({
  token: '',
  userInfo: {
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    mobile: 0,
    deptId: 0,
    deptName: '',
    job: '',
    state: 0,
    role: 0,
    roleList: '',
    createId: 0,
    userImg: '',
  },
  updateToken: token => set({token}),
  updateUserInfo: (userInfo: User.UserItem) => set({userInfo}),
}))
