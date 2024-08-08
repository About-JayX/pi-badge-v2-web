import Header from '@/components/header'
import Router from '@/router'

import { bindPidAPI, requestPiLogin } from './axios/api'
import BgAnimation from './components/animation/bg'
import Message from './components/message'
import useInitialize from './hook/initialize'
import { getCookieKey } from './util'
import { useEffect } from 'react'
import { useStoreDispatch } from './hook'
import { updatepidUserInfo, updatePiUser } from './store/ethers'

export default function App() {
  useInitialize()
  const dispatch = useStoreDispatch()
  const signPiBrowser = async () => {
    try {
      const scopes = ['payments', 'username']
      const authResponse = await window.Pi.authenticate(scopes, () => {})
      dispatch(updatePiUser({ ...authResponse }))

      if (authResponse && authResponse.user && authResponse.user.uid) {
        try {
          const result = await bindPidAPI({ pid: authResponse.user.uid })
          alert(JSON.stringify(result))
        } catch (error) {
          console.log(error, 'bind_error_')
        }
      }
    } catch (error) {
      console.log(error, 'pi_web_error_')
    }
  }

  useEffect(() => {
    signPiBrowser()
  }, [])
  return (
    <>
      <Message />
      <Header />
      <BgAnimation />
      <main className="container pt-[16px] sm:pt-[60px] pb-[16px] sm:pb-[60px]">
        <Router />
      </main>
    </>
  )
}
