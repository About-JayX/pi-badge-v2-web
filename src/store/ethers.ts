import { JsonRpcProvider } from '@ethersproject/providers'
import { createSlice } from '@reduxjs/toolkit'

import { config as networkConfig, networkId } from '@/config/network'
import { requestRpc, walletProviders } from '@/hook/ethers'

interface PidUserInfo {
  address: string
  badge_id: number
  exp: number
  inviter: boolean
  invitercount: number
  is_sgin: boolean
  priority: number
  signcount: number
  uid: string
}

// Ethers接口类型
export interface ethersType {
  address: string // 地址
  balance: string // 余额
  networkId: number // 网络ID
  pageNetworkId: number // 网络ID
  networkName: string // 网络名称
  networkStatus: boolean // 网络状态: true错误 false正常
  walletId: number // 钱包ID
  rpc: string // RPC
  providers: JsonRpcProvider // 提供者
  pidUserInfo: PidUserInfo //pid详情
  walletStatus: boolean // 钱包弹框状态
  piUser: any
  pidKey: string
}

// 初始化state
const initialState = {
  address: localStorage.getItem('address') || '', // 地址 0x14CE3934db4B0c80E596377547e084eDdD385c25
  balance: '0.0000',
  networkId, // 网络ID
  pageNetworkId: networkId, // 页面网络ID
  networkName: String(
    networkConfig.find(res => res.chainId === networkId)?.name
  ), // 网络名称
  networkStatus: false, // 网络状态:true错误 false正常
  walletId: 0, // 钱包ID
  rpc: '', // RPC
  providers: null,
  pidUserInfo: {},
  walletStatus: false,
  piUser: {},
  pidKey: '',
} as unknown as ethersType

// 初始化创建state及actions
const initialSlice = createSlice({
  name: 'ethers',
  // State全局
  initialState,
  // Actions方法
  reducers: {
    // 更新地址
    updateAddress(state, action) {
      state.address = action.payload
    },
    // 更新用户详情
    updatepidUserInfo(state, action) {
      state.pidUserInfo = action.payload
    },
    // 更新余额
    updateBalance(state, action) {
      state.balance = action.payload
    },
    // 更新网络状态
    updateNetworkStatus(state, action) {
      state.networkStatus = action.payload
    },
    // 更新网络ID
    updateNetworkId(state, action) {
      state.networkId = action.payload
    },
    // 更新页面网络ID
    updatepageNetworkId(state, action) {
      state.pageNetworkId = action.payload
    },
    // 更新钱包ID
    updateWalletId(state, action) {
      state.walletId = action.payload
    },
    // 更新RPC
    updateRpc(state, action) {
      state.rpc = action.payload
    },
    //更新网络名称
    updateNetworkName(state, action) {
      state.networkName = action.payload
    },
    // 更新钱包状态
    updateWalletStatus(state, action) {
      state.walletStatus = action.payload
    },
    updatePiUser(state, action) {
      state.piUser = action.payload
    },
    updatePidKey(state, action) {
      state.pidKey = action.payload
    },
  },
  // 异步处理
  extraReducers: builder => {
    // 异步处理请求RPC
    builder.addCase(requestRpc.fulfilled, (state, action) => {
      state.rpc = action.payload
      // state.providers = new JsonRpcProvider(action.payload);
    })
    // 异步处理请求提供者
    builder.addCase(walletProviders.fulfilled, (state, action) => {
      state.providers = action.payload
    })
  },
})

// 导出Actions方法
export const {
  updateWalletStatus,
  updateAddress,
  updatepidUserInfo,
  updateBalance,
  updateNetworkId,
  updateRpc,
  updatepageNetworkId,
  updateNetworkStatus,
  updateWalletId,
  updateNetworkName,
  updatePiUser,
  updatePidKey,
} = initialSlice.actions
// 导出state变量
export default initialSlice.reducer
