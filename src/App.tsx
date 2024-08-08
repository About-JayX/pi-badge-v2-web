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
    !result &&
      authResponse &&
      authResponse.user &&
      authResponse.user.uid &&
      setOpen(true)
  }

  const getBind = async () => {
    if (piUser && piUser.user && piUser.user.uid && !pidKey) {
      try {
        const result: any = await bindPidAPI({ pid: piUser.user.uid })
        if (result.success) {
          const res: any = await findPidAPI()
          dispatch(updatePidKey(res ? res.pId : res))
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
