import api from '@/axios'
import { pidsignApiUrl, spiApiUrl, telegramApiUrl } from '@/axios/url'

export const getPidList = () => {
  return api.post(`${spiApiUrl}/v1/Registered?length=all`)
}

export const getPidSign = () => {
  return api.post(`${pidsignApiUrl}/sign`)
}
export const getPiWeb3lLogin = () => {
  return api.post(`${pidsignApiUrl}/v1/web3login`)
}

export const findBind = (data: any) => {
  return api.post(`${telegramApiUrl}/authorize-Bind/find-address`, data)
}

export const bindWallet = (data: any) => {
  return api.post(`${telegramApiUrl}/authorize-Bind/bind-wallet`, data)
}

export const getUserAPI = (data?: any) =>
  api.post(`${telegramApiUrl}/botapp/current-user`, data)
