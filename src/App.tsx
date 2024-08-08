import { useEffect, useState } from 'react'

import Header from '@/components/header'
import Router from '@/router'

import { bindPidAPI, findPidAPI } from './axios/api'
import BgAnimation from './components/animation/bg'
import Message from './components/message'
import PiModal from './components/piModal'
import { useStoreDispatch, useStoreSelector } from './hook'
import useInitialize from './hook/initialize'
import { updatePiUser, updatePidKey } from './store/ethers'

export default function App() {
  const [open, setOpen] = useState(false)
  useInitialize()
  const dispatch = useStoreDispatch()
  const { pidKey, piUser } = useStoreSelector(state => state.ethers)
  const signPiBrowser = async () => {
    const result: any = await findPidAPI()
    const scopes = ['payments', 'username']
    const authResponse = await window.Pi.authenticate(scopes, () => {})
    dispatch(updatePiUser({ ...authResponse }))
    dispatch(updatePidKey(result ? result.pId : result))
    !result && piUser && piUser.user && piUser.user.uid && setOpen(true)
  }

  const getBind = async () => {
    try {
      if (piUser && piUser.user && piUser.user.uid && !pidKey) {
        try {
          const result = await bindPidAPI({ pid: piUser.user.uid })
          alert(JSON.stringify(result))
        } catch (error) {
          alert(JSON.stringify(error) + ' error')
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
      <PiModal
        open={open}
        setWalletOpen={(bool) => setOpen(bool)}
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
