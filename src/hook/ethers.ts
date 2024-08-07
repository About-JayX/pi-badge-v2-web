import { createAsyncThunk } from '@reduxjs/toolkit'
// import { message } from "antd";
import { ethers as wallet } from 'ethers'

// import { t } from "i18next";
import api from '@/axios'
import {
  config as networkConfig,
  configType as networkConfigType,
} from '@/config/network'
import { stateType } from '@/store'
import {
  updateAddress,
  updateBalance,
  updateNetworkId,
  updateNetworkName,
  updateNetworkStatus,
  updateRpc,
  updateWalletId,
  updateWalletStatus,
} from '@/store/ethers'
// 钱包提供者
export const walletProviders = createAsyncThunk(
  'ethers/walletProviders',
  async (_, { getState, dispatch }) => {
    const { ethers } = getState() as stateType
    const { rpc } = ethers

    try {
      // 判断钱包是否存在 存在就调用Web3Provider 没有直接调用JsonRpcProvider
      const providers =
        window.ethereum !== undefined
          ? new wallet.providers.Web3Provider(window.ethereum)
          : new wallet.providers.JsonRpcProvider(rpc)
      const accounts = await providers.listAccounts()

      if (!accounts.length) await dispatch(disconnect(false))

      return providers
    } catch (error) {
      throw new Error(' wallet providers error:' + error)
    }
  }
)

// 连接
export const connect = createAsyncThunk(
  'ethers/connect',
  async (_, { dispatch }) => {
    // const { res = "" } = _;
    // console.log("获取钱包类型", res);
    // try {
    // 	// 账号
    // 	const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    // 	// 存储钱包地址
    // 	localStorage.setItem("address", accounts[0]);

    // 	// 更新钱包地址
    // 	dispatch(updateAddress(accounts[0]));

    // 	message.open({
    // 		type: "success",
    // 		content: t("message.connect.success")
    // 	});
    // } catch (error: any) {
    // 	throw new Error("Check if the wallet is already installed");
    // }

    dispatch(updateWalletStatus(true))
  }
)

// 连接钱包
export const connectWallet = createAsyncThunk(
  'ethers/connectWallet',
  async (_: { name?: string }, { getState, dispatch }) => {
    const { ethers } = getState() as any
    let accounts: string = ''

    console.log(ethers, '??')

    if (ethers.networkId === -1) {
      const result = await window.solana.connect()
      const address = result.publicKey.toString()
      accounts = address
      console.log(accounts, 'accounts')

      if (accounts) {
        // 存储钱包地址
        localStorage.setItem('address', accounts)

        // 更新钱包地址
        dispatch(updateAddress(accounts))
        dispatch(updateWalletStatus(false))
        // message.open({
        //   type: "success",
        //   content: t("message.connect.success"),
        // });
      }
      return
    } else {
      const { name = 'ethereum' } = _

      try {
        // 判断是否为小狐狸或TokenPocket
        if (name === 'ethereum' || name === 'tokenpocket') {
          if (window.ethereum) {
            const wallet = await window.ethereum.request({
              method: 'eth_requestAccounts',
            })
            accounts = wallet[0]
          } else {
            //   message.open({
            //     type: "error",
            //     content: t("message.connect.fail"),
            //   });
          }
        }

        // 判断是否为bitkeep
        if (name === 'bitkeep') {
          if (window.bitkeep) {
            const wallet = await window.bitkeep.ethereum.request({
              method: 'eth_requestAccounts',
            })
            accounts = wallet[0]
          } else {
            //   message.open({
            //     type: "error",
            //     content: t("message.connect.fail"),
            //   });
          }
        }

        // 判断是否为coinbase
        if (name === 'coinbase') {
          if (window.coinbaseSolana) {
            await window.coinbaseSolana.connect()
            accounts = window.coinbaseSolana.publicKey.toString()
          } else {
            //   message.open({
            //     type: "error",
            //     content: t("message.connect.fail"),
            //   });
          }
        }

        // 判断是否为tronlink
        if (name === 'tronlink') {
          if (window.TronLinkEVM) {
            const wallet = await window.TronLinkEVM.request({
              method: 'eth_requestAccounts',
            })
            accounts = wallet[0]
          } else {
            //   message.open({
            //     type: "error",
            //     content: t("message.connect.fail"),
            //   });
          }
        }

        // 判断是否为欧易
        if (name === 'okex') {
          if (window.okexchain) {
            const wallet = await window.okexchain.request({
              method: 'eth_requestAccounts',
            })
            accounts = wallet[0]
          } else {
            //   message.open({
            //     type: "error",
            //     content: t("message.connect.fail"),
            //   });
          }
        }

        if (accounts) {
          // 存储钱包地址
          localStorage.setItem('address', accounts)

          // 更新钱包地址
          dispatch(updateAddress(accounts))
          dispatch(updateWalletStatus(false))
          // message.open({
          //   type: "success",
          //   content: t("message.connect.success"),
          // });
        }
      } catch (error: any) {
        throw new Error('Check if the wallet is already installed')
      }
    }
  }
)

// 获取余额
export const usebalance = createAsyncThunk(
  'ethers/usebalance',
  async (_, { getState, dispatch }) => {
    const { ethers } = getState() as stateType
    const { address, providers } = ethers // 获取钱包地址和提供者
    // (ethers, "ethers");
    // 判断提供者是否为空
    if (providers === null) return
    if (!address) return

    try {
      // 使用钱包提供者获取余额
      const getBalance = await providers.getBalance(address)
      const balanceEther = wallet.utils.formatEther(getBalance)
      // 将余额更新到 Redux store 中
      dispatch(updateBalance(balanceEther))
      // 返回余额
    } catch (error) {
      throw new Error('Error fetching balance: ' + error)
    }
  }
)

// 断开连接
export const disconnect =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


    (_showTips: boolean = true) =>
    async (
      dispatch: (arg0: { payload: any; type: 'ethers/updateAddress' }) => void
    ) => {
      // const address = localStorage.getItem("address");
      // 删除存储钱包地址
      localStorage.removeItem('address')
      // localStorage.removeItem(`${address}--obtainList`);
      // localStorage.removeItem(`${address}--expendList`);
      // 更新钱包地址
      dispatch(updateAddress(''))

      // showTips &&
      //   message.open({
      //     type: "success",
      //     content: t("message.disconnect.success"),
      //   });
    }

// 请求RPC
export const requestRpc = createAsyncThunk(
  'ethers/requestRpc',
  async (_, { getState }) => {
    const state = getState() as stateType
    const { networkId } = state.ethers

    // 查找对应的网络配置
    const network = networkConfig.find(
      res => res.chainId === networkId
    ) as networkConfigType

    // 发起所有的RPC请求
    const requests = network?.rpcUrls.map(rpcUrl =>
      // 返回当前请求成功RPC
      api
        .post(rpcUrl, {
          jsonrpc: '2.0',
          method: 'eth_getBlockByNumber',
          params: ['latest', false],
          id: 1,
        })
        .then((res: any) => res.config.url)
    )
    try {
      // 返回请求最快的RPC
      return (await Promise.any(requests)) as string
    } catch (error) {
      throw new Error('request failed:' + error)
    }
  }
)

// 检测网络
export const detectNetwork = createAsyncThunk(
  'ethers/detectNetwork',
  async (_, { getState, dispatch }) => {
    const { ethers } = getState() as stateType
    const { providers } = ethers

    try {
      // 判断钱包是否存在
      if (typeof window.ethereum !== 'undefined') {
        // 钱包网络信息
        const { chainId } = await providers.getNetwork()
        const network = networkConfig.find(
          res => res.chainId === chainId
        ) as networkConfigType

        // 更新网络状态
        // dispatch(updateNetworkStatus(networkId !== chainId));
        // 更新钱包ID
        dispatch(updateWalletId(chainId))

        dispatch(updateNetworkId(chainId))

        dispatch(updateNetworkName(network.name))

        // 监听网络切换
        window.ethereum.on('chainChanged', (HexId: string) => {
          const id = wallet.BigNumber.from(HexId).toNumber()
          const network = networkConfig.find(
            res => res.chainId === id
          ) as networkConfigType

          // 更新网络状态
          // dispatch(updateNetworkStatus(networkId !== id));
          // 更新钱包ID
          dispatch(updateWalletId(id))
          dispatch(updateNetworkId(id))
          dispatch(updateNetworkName(network.name))
        })
      }
    } catch (error) {
      throw new Error('detect network error:' + error)
    }
  }
)

// 监听钱包地址
export const onWalletAddress =
  () =>
  async (
    dispatch: (arg0: { payload: any; type: 'ethers/updateAddress' }) => void
  ) => {
    try {
      // 判断钱包是否存在
      if (typeof window.ethereum !== 'undefined') {
        // 监听账号切换
        window.ethereum.on('accountsChanged', (accounts: any) => {
          // 存储钱包地址
          localStorage.setItem('address', accounts[0])

          // localStorage.removeItem(`${accounts[0]}--obtainList`);
          // localStorage.removeItem(`${accounts[0]}--expendList`);
          // 更新钱包地址
          dispatch(updateAddress(accounts[0]))
          //钱包变化
        })
      }
    } catch (error) {
      throw new Error('Check if the wallet is already installed')
    }
  }

// 切换网络
export const switchNetwork = createAsyncThunk(
  'ethers/switchNetwork',
  async (value: any, { getState, dispatch }) => {
    const { ethers } = getState() as stateType
    const { rpc, pageNetworkId } = ethers

    if (value === -1) {
      dispatch(updateNetworkStatus(false))
      // 更新网络名称
      dispatch(updateNetworkName('solana'))
      dispatch(updateNetworkId(value))

      // 存储网络ID
      localStorage.setItem('networkId', String(value))
      return true
    }
    try {
      // 查找对应的网络配置
      const network = networkConfig.find(
        res =>
          res.chainId === pageNetworkId ||
          res.chainId.toString() === pageNetworkId.toString()
      ) as networkConfigType

      // 判断钱包是否存在
      if (typeof window.ethereum !== 'undefined') {
        // 检测当前网络是否存在:不存在就增加
        await window.ethereum
          .request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId:
                  network.chainId === 1
                    ? '0x1'
                    : wallet.BigNumber.from(network.chainId).toHexString(),
              },
            ],
          })
          .then(() => {
            // 触发钱包提供者
            dispatch(walletProviders())
            // 更新网络状态:返回成功为false
            dispatch(updateNetworkStatus(false))
            // 更新网络名称
            dispatch(updateNetworkName(network.name))

            // 存储网络ID
            localStorage.setItem('networkId', String(network.chainId))
          })
          .catch((error: any) => {
            // dispatch(updateNetworkStatus(true));

            console.error(error, '检查网络是否存在')
            // 返回失败就增加网络
            window.ethereum
              .request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: wallet.BigNumber.from(
                      network.chainId
                    ).toHexString(),
                    chainName: network.chainName,
                    nativeCurrency: network.nativeCurrency,
                    rpcUrls: [rpc],
                    blockExplorerUrls: network.blockExplorerUrls,
                  },
                ],
              })
              .then(() => {
                // 触发钱包提供者
                dispatch(walletProviders())
                // 更新网络状态:返回成功为false
                dispatch(updateNetworkStatus(false))
                // 更新网络名称
                dispatch(updateNetworkName(network.name))
                // 存储网络ID
                localStorage.setItem('networkId', String(network.chainId))
              })
          })
      } else {
        // console.log("切换网络为空", network, ethers);
        // 更新网络状态
        // dispatch(updateNetworkStatus(false));

        dispatch(updateNetworkId(network.chainId))
        dispatch(updateNetworkName(network.name))
        //创建一个虚拟钱包
        dispatch(updateRpc(network.rpcUrls[0]))
      }
    } catch (error) {
      console.error(error)
      throw new Error('Check if the wallet is already installed')
    }
  }
)
