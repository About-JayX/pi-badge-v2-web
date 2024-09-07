import { useEffect, useState } from 'react'

import Header from '@/components/header'
import Router from '@/router'

import { bindPidAPI, findInfoAPI } from './axios/api'
import BgAnimation from './components/animation/bg'
import Message from './components/message'
import PiModal from './components/piModal'
import { useStoreDispatch, useStoreSelector } from './hook'
import useInitialize from './hook/initialize'
import { updatepidUserInfo, updatePiUser } from './store/ethers'
import { getUrlParams } from './util'

export default function App() {
  const [open, setOpen] = useState(false)
  useInitialize()
  const dispatch = useStoreDispatch()
  const { pidUserInfo, piUser } = useStoreSelector(state => state.ethers)

  const signPiBrowser = async () => {
    const params = (location.search && getUrlParams(location.search)) || null
    const result: any = params ? await findInfoAPI({ code: params.v }) : ''
    dispatch(updatepidUserInfo(result))
    const scopes = ['payments', 'username']
    try {
      dispatch(updatePiUser({ user: { uid: '1234' } }))
      // const authResponse = await window.Pi.authenticate(scopes, () => {})
      // dispatch(updatePiUser({ ...authResponse }))
      // alert(JSON.stringify(authResponse))
      // !result &&
      //   authResponse &&
      //   authResponse.user &&
      //   authResponse.user.uid &&
      //   setOpen(true)
    } catch (error) {
      console.log(error, 'error_')
    }
  }

  const getBind = async () => {
    const params = (location.search && getUrlParams(location.search)) || null
    const pidKey =
      (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Pid) || ''

    if (piUser && piUser.user && piUser.user.uid && !pidKey) {
      try {
        const result: any = await bindPidAPI({
          code: params.v,
          pid: piUser.user.uid,
        })
        if (result.success) {
          const res: any = await findInfoAPI({ code: params.v })
          dispatch(updatepidUserInfo(res))
        } else {
          alert(JSON.stringify(result))
        }
      } catch (error) {
        alert(JSON.stringify(error) + ' error')
      }
      setOpen(false)
    }
  }
  useEffect(() => {
    signPiBrowser()
  }, [])
  return (
    <>
      <PiModal
        open={open}
        setWalletOpen={bool => setOpen(bool)}
        bind={getBind}
      />
      <Message />
      <Header />
      <BgAnimation />
      <main className="container pt-[16px] sm:pt-[60px] pb-[16px] sm:pb-[60px]">
        <Router />
      </main>
    </>
  )
}
