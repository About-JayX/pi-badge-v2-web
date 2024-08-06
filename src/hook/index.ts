import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { dispatchType, stateType } from "@/store";

// 全局State变量
export const useStoreSelector: TypedUseSelectorHook<stateType> = useSelector;

// 全局Actions方法
export const useStoreDispatch: () => dispatchType = useDispatch;
