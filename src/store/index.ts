import { configureStore } from "@reduxjs/toolkit";

import ethers from "@/store/ethers";
// 全局
const store = configureStore({
  reducer: {
    ethers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// 全局变量类型
export type stateType = ReturnType<typeof store.getState>;

// 全局Actions方法类型
export type dispatchType = typeof store.dispatch;

// 导出全局
export default store;
