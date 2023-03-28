import { defineStore } from "pinia";
// useMain  可以是 useUser、useCart 之类的名字
// defineStore('main',{..}) 在devtools 就使用 main 这个名
interface UserData {
  department: string;
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  userId: number;
  userName: string;
  userType: string;
}
export const useMain = defineStore("main", {
  // 相当于data
  state: () => ({
    department: "",
    email: "",
    name: "",
    password: "",
    phoneNumber: "",
    userId: 0,
    userName: "",
    userType: "",
    routerPath:""
  }),
  // 相当于计算属性
  getters: {},
  // 相当于vuex的 mutation + action，可以同时写同步和异步的代码

  actions: {
    setData(data: UserData) {
      this.department = data.department;
      this.email = data.email;
      this.name = data.name;
      this.password = data.password;
      this.phoneNumber = data.phoneNumber;
      this.userId = data.userId;
      this.userName = data.userName;
      this.userType = data.userType;
    },
  },
  persist: {
    enabled: true
  }
});
