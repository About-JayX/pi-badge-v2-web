// import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import { Fragment, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
// import { disconnect, switchNetwork } from "@/hook/ethers";
import { useTranslation } from 'react-i18next'
import Web3 from 'web3'

import SuccessDonePng from '@/assets/image/success.png'
import SuccessNonePng from '@/assets/image/success-none.png'
import copyPng from '@/assets/image/copy.png'
import { bindPidAPI, bindWallet, findInfoAPI } from '@/axios/api'
import Box from '@/components/box'
import Buttons from '@/components/buttons'
import Dropdowns from '@/components/dropdown'
import { HeaderTitle } from '@/components/header'
import Icon from '@/components/icon'
import { MessageError, MessageSuccess } from '@/components/message'
import Segmentation from '@/components/segmentation'
import Wallet from '@/components/wallet'
import Config from '@/config'
import telegramBotUrl from '@/config/telegramBotUrl'
import { useStoreDispatch, useStoreSelector } from '@/hook'
import { disconnect, switchNetwork } from '@/hook/ethers'
import {
  updateAddress,
  updatepageNetworkId,
  updatepidUserInfo,
  updateWalletStatus,
} from '@/store/ethers'
import { ellipsisMiddle, getUrlParams, semicolon } from '@/util'

const PisSvg = ({
  status = '',
  buyStatus = 'min',
  price = 0,
  quantity = 0,
}: {
  status?: 'popular' | 'best' | ''
  buyStatus?: 'min' | 'max' | 'max-full'
  price?: number
  quantity?: number
}) => {
  return (
    <svg viewBox="0 0 249 268">
      <image
        x="2.5"
        y="2.5"
        width="calc(100% - 2.5px)"
        height="calc(100% - 2.5px)"
        preserveAspectRatio="xMidYMid slice"
        xlinkHref={`/image/pis/bg-${buyStatus}.png`}
      />
      {status && (
        <>
          <image
            x="0"
            y="0"
            className="w-[90px] h-[20px]"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref={`/image/pis/${status}.png`}
          />
          <text x="5" y="16" fill="#fff" className="text-[12px] uppercase">
            {status}
          </text>
        </>
      )}
      <foreignObject
        x="0"
        y="150"
        width="100%"
        height={60}
        className="text-end pr-[18px] grid items-center"
      >
        <span className="text-[#87E7FF] text-[16px]">Pis</span>
        <span className="text-[#DEAD2E] text-[22px] mt-[-3px]">
          {semicolon(quantity)}
        </span>
      </foreignObject>
      <foreignObject
        x="0"
        y="222.5"
        width="100%"
        height={30}
        className="text-end pr-[18px] text-[20px]"
      >
        <div className="flex w-full justify-end gap-[6px]">
          <span className="text-[#4489C6]">USD</span>
          <span className="text-[#CFE7F7]">${semicolon(price)}</span>
        </div>
      </foreignObject>
    </svg>
  )
}

const Pis = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 205" id="Pis">
      <g style={{ order: -1 }}>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="1"
          stroke="#48B7F2"
          fill="none"
          points="70,70 148,50 130,130 50,150"
          id="bounce"
        ></polygon>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="1"
          stroke="#48B7F2"
          fill="none"
          points="70,70 148,50 130,130 50,150"
          id="bounce2"
        ></polygon>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="2"
          stroke=""
          fill="#414750"
          points="70,70 150,50 130,130 50,150"
        ></polygon>
        <polygon
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente)"
          points="100,70 150,100 100,130 50,100"
        ></polygon>
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
            <stop
              style={{ stopColor: '#1e2026', stopOpacity: 1 }}
              offset="20%"
            ></stop>
            <stop
              style={{ stopColor: '#414750', stopOpacity: 1 }}
              offset="60%"
            ></stop>
          </linearGradient>
        </defs>
        <polygon
          transform="translate(20, 31)"
          strokeWidth="2"
          stroke=""
          fill="#0460B2"
          points="80,50 80,75 80,99 40,75"
        ></polygon>
        <polygon
          transform="translate(20, 31)"
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente2)"
          points="40,-40 80,-40 80,99 40,75"
        ></polygon>
        <defs>
          <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradiente2">
            <stop
              style={{ stopColor: '#1c8dc900', stopOpacity: 1 }}
              offset="20%"
            ></stop>
            <stop
              style={{ stopColor: '#48B7F2', stopOpacity: 1 }}
              offset="100%"
              id="animatedStop"
            ></stop>
          </linearGradient>
        </defs>
        <polygon
          transform="rotate(180 100 100) translate(20, 20)"
          strokeWidth="2"
          stroke=""
          fill="#48B7F2"
          points="80,50 80,75 80,99 40,75"
        ></polygon>
        <polygon
          transform="rotate(0 100 100) translate(60, 20)"
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente3)"
          points="40,-40 80,-40 80,85 40,110.2"
        ></polygon>
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
            <stop
              style={{ stopColor: '#1c8dc900', stopOpacity: 1 }}
              offset="20%"
            ></stop>
            <stop
              style={{ stopColor: '#48B7F2', stopOpacity: 1 }}
              offset="100%"
              id="animatedStop"
            ></stop>
          </linearGradient>
        </defs>
        <polygon
          transform="rotate(45 100 100) translate(80, 95)"
          strokeWidth="2"
          stroke=""
          fill="#ffffff7b"
          points="5,0 5,5 0,5 0,0"
          id="particles"
        ></polygon>
        <polygon
          transform="rotate(45 100 100) translate(80, 55)"
          strokeWidth="2"
          stroke=""
          fill="#ffffff7b"
          points="6,0 6,6 0,6 0,0"
          id="particles"
        ></polygon>
        <polygon
          transform="rotate(45 100 100) translate(70, 80)"
          strokeWidth="2"
          stroke=""
          fill="#ffffff7b"
          points="2,0 2,2 0,2 0,0"
          id="particles"
        ></polygon>
        <polygon
          strokeWidth="2"
          stroke=""
          fill="#292d34"
          points="29.5,99.8 100,142 100,172 29.5,130"
        ></polygon>
        <polygon
          transform="translate(50, 92)"
          strokeWidth="2"
          stroke=""
          fill="#1f2127"
          points="50,50 120.5,8 120.5,35 50,80"
        ></polygon>
      </g>
      <image
        x="72.5"
        y="25"
        id="bounce3"
        className="w-[50px] h-[50px]"
        preserveAspectRatio="xMidYMid slice"
        xlinkHref={`/logos.svg`}
      />
    </svg>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const { address, piUser, pidUserInfo } = useStoreSelector(
    state => state.ethers
  )
  const dispatch = useStoreDispatch()
  const [chain, setChain] = useState(['Pi'])
  const [chainValue, setChainValue] = useState<string>(chain?.[0])
  const chains = [
    { name: 'SOL', value: 'solana', chainId: -1 },
    { name: 'ETH', value: 'eth', chainId: 1 },
    { name: 'BSC', value: 'bsc', chainId: 56 },
  ]
  const [network, setNetwork] = useState<any>(chains[0])
  const [_, setChainValues] = useState('eth')
  const [walletStatus, setWalletStatus] = useState<boolean>(false)
  const [loaderWalletStatus, setLoaderWalletStatus] = useState(false)
  const [urlParmas, setUrlParams] = useState<any>({})
  const [bindLoading, setBindLoading] = useState(false)
  const getBind = async (pidKey: any, code: any) => {
    setBindLoading(true)
    if (pidKey) {
      try {
        const result: any = await bindPidAPI({
          code,
          pid: pidKey,
        })

        if (result.success) {
          const res: any = await findInfoAPI({ code })
          dispatch(updatepidUserInfo(res))
          MessageSuccess(t('message.bind.success'))
        } else {
          MessageError(t('message.bind.fail'))
        }
      } catch (error) {
        MessageError(t('message.bind.fail'))
      }
    }
    setBindLoading(false)
  }
  const bindERC20Wallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)

      if (window.ethereum.isMetaMask) {
        console.log('Using MetaMask')
      } else if (window.ethereum.isBitget) {
        console.log('Using Bitget Wallet')
      } else if (window.ethereum.isOkxWallet) {
        console.log('Using OKX Wallet')
      } else {
        console.log('Using an unknown Ethereum wallet')
      }
      const params = getUrlParams(location.search)

      const token = params.v
      try {
        const accounts = await web3.eth.getAccounts()
        const address = accounts[0]

        const message = `Binding EVM Address: User is ${token}, Wallet Address is ${address.toLowerCase()}, Please Confirm The Sign`
        const signature = await web3.eth.personal.sign(message, address, '')

        const res = await bindWallet({
          address,
          user: token,
          signature,
          message,
          type: 'erc20',
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      throw new Error('install b')
    }
  }

  const bindSolanaWallet = async () => {
    try {
      const wallet = window.solana

      if (!wallet) {
        throw new Error('install b')
      }

      await wallet.connect()
      const publicKey = wallet.publicKey.toString()
      const params = getUrlParams(location.search)
      const token = params.v
      const message = `Binding SOL Address: User is ${token}, Wallet Address is ${publicKey.toLowerCase()}, Please Confirm The Sign`
      const encodedMessage = new TextEncoder().encode(message)
      const signatureObj = await wallet.signMessage(encodedMessage)

      const signature = Array.from(signatureObj.signature)
      await bindWallet({
        address: publicKey,
        type: 'solana',
        signature,
        message: Array.from(encodedMessage),
        user: token,
      })
    } catch (error) {
      throw new Error('install b')
    }
  }
  const [bindStatus, setBindStatus] = useState(false)
  const getAddressBox = () => {
    const params = getUrlParams(location.search)
    const type = params.t ? params.t : chain[0]
    const pidKey =
      (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Pid) || ''

    let data: any = ''
    if (chainValue === 'ETH/BSC') {
      data =
        (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Erc20) ||
        ''
    }
    if (chainValue === 'SOL') {
      data =
        (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Sonala) ||
        ''
    }
    const copyPid = async () => {
      try {
        await navigator.clipboard.writeText(piUser.user.uid)
        MessageSuccess(t('message.copy.success'))
      } catch (error) {
        MessageError(t('message.copy.fail'))
      }
    }
    const bind = async () => {
      try {
        setBindStatus(true)
        if (chainValue === 'ETH/BSC') {
          await bindERC20Wallet()
        }
        if (chainValue === 'SOL') {
          await bindSolanaWallet()
        }

        await init(type)
        setBindStatus(false)
        MessageSuccess(t('message.bind.success'))
      } catch (error) {
        setBindStatus(false)
        MessageError(t('message.bind.fail'))
      }
    }
    const token = params.v

    return chainValue === 'Pi' ? (
      <>
        <Box
          click={() => {
            if (bindLoading) return
            piUser.user && piUser.user.uid
              ? token
                ? pidKey
                  ? ''
                  : getBind(piUser.user.uid, token)
                : copyPid()
              : ''
          }}
        >
          <Icon name="piNetwork" className="w-[26px] h-[26px]" />
          {piUser.user && piUser.user.uid
            ? token
              ? pidKey
                ? ellipsisMiddle(pidKey, 8)
                : t('public.bind')
              : ellipsisMiddle(piUser.user.uid, 8)
            : t('public.piBrowserText')}

          {piUser.user && piUser.user.uid ? (
            token ? (
              pidKey ? (
                <img src={SuccessDonePng} className="w-[22px] h-[16px]" />
              ) : (
                <img src={SuccessNonePng} className="w-[22px] h-[16px]" />
              )
            ) : (
              <img src={copyPng} className="w-[30px] h-[30px]" />
            )
          ) : (
            ''
          )}
        </Box>
      </>
    ) : data ? (
      <Box>
        <Icon
          name={
            chainValue === 'SOL'
              ? 'sol'
              : '' || chainValue === 'ETH/BSC'
              ? 'wallet'
              : '' || chainValue === 'Pi'
              ? 'piNetwork'
              : ''
          }
          className="w-[26px] h-[26px]"
        />
        <span>{data && ellipsisMiddle(data, 9)}</span>
        <img
          src={data ? SuccessDonePng : SuccessNonePng}
          className="w-[22px] h-[16px]"
        />
      </Box>
    ) : (
      <Buttons onClick={() => bind()} loading={bindStatus}>
        {t('public.bind')}
      </Buttons>
    )
  }
  useEffect(() => {
    if (address) {
      setWalletStatus(false)
    }
  }, [address])

  useEffect(() => {
    const params = getUrlParams(location.search)
    const type = params.t ? params.t : chain[0]
    setNetwork((_: any) => {
      const obj: any =
        chains.find((item: any) =>
          type === 'solana' ? item.value === type : item.value === 'eth'
        ) || {}
      dispatch(switchNetwork(obj.chainId ? obj.chainId : 1)).then(() => {
        setChainValues(obj.value ? obj.value : 'eth')
      })

      return obj
    })
    setChainValue(type === 'solana' ? 'SOL' : 'ETH/BSC')

    if (params.v) {
      setUrlParams(params)
      setChain(['Solana', 'ETH/BSC', 'Pi'])
    } else {
      setChainValue('Pi')
    }
    init(type)
  }, [])

  const init = async (type?: string) => {
    const web3 = new Web3(window.ethereum)
    let address = ''
    if (type === 'solana') {
      const wallet = window.solana
      address = wallet && wallet.publicKey ? wallet.publicKey.toString() : ''
    } else {
      const accounts = await web3.eth.getAccounts()
      address = accounts.length ? accounts[0] : ''
    }
    localStorage.setItem('address', address)
    // 更新钱包地址
    dispatch(updateAddress(address))
    const parmas = getUrlParams(location.search) || null
    const code = parmas ? parmas.v : ''
    const user = await findInfoAPI({ code })

    dispatch(updatepidUserInfo(user))
  }

  return (
    <Fragment>
      <Wallet
        setLoaderWalletStatus={setLoaderWalletStatus}
        open={walletStatus}
        setWalletOpen={e => setWalletStatus(e)}
        getUrl={() => ''}
      />
      <div className="grid grid-cols-12">
        <div className="z-[1] col-span-12 grid items-center grid-cols-[1fr] lg:grid-cols-[320px,1fr] xl:grid-cols-[360px,1fr] gap-[36px] xl:gap-[50px]">
          <div className="hidden lg:flex">
            <Pis />
          </div>
          <div className="grid h-fit gap-[16px] lg:gap-[26px]">
            <div className="col-span-12 grid gap-[6px]">
              <span className="text-[32px] font-[700] flex items-center gap-[16px]">
                {/* <Icon
                  name="telegram"
                  className="w-[32px] h-[32px] text-[#718096]"
                /> */}
                {pidUserInfo && pidUserInfo.user_id
                  ? pidUserInfo.user_name
                  : t('home.title')}
              </span>
              <span className="text-[#718096] text-[20px]">
                {pidUserInfo && pidUserInfo.user_id
                  ? 'Telegram ID : ' + pidUserInfo.user_id
                  : t('home.text')}
              </span>
              <a
                target="_blank"
                href={telegramBotUrl}
                className="max-w-full sm:max-w-[200px]"
              >
                <Buttons className="max-w-[160px]">
                  <Icon name="robot" className="w-[20px] h-[20px]" />
                  {t('public.telegramBot')}
                </Buttons>
              </a>
            </div>
            <div className="col-span-12 grid gap-[16px] h-fit">
              <div className="col-span-12 flex gap-[8px] items-center mb-[-8px] sm:mb-[0] flex-wrap">
                {urlParmas.v && (
                  <Dropdowns
                    menu={
                      <>
                        {chains.map((item, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={async () => {
                              let address = ''
                              const web3 = new Web3(window.ethereum)
                              if (item.value === 'solana') {
                                const wallet = window.solana
                                address =
                                  wallet && wallet.publicKey
                                    ? wallet.publicKey.toString()
                                    : ''
                              } else {
                                const accounts = await web3.eth.getAccounts()
                                address = accounts.length ? accounts[0] : ''
                              }
                              // 存储钱包地址
                              localStorage.setItem('address', address)
                              // 更新钱包地址
                              dispatch(updateAddress(address))
                              dispatch(updateWalletStatus(true))
                              // 更新网络ID
                              setNetwork(item)
                              dispatch(updatepageNetworkId(item.chainId))
                              // 切换网络
                              dispatch(switchNetwork(item.chainId)).then(() => {
                                setChainValues(item.value)
                              })
                            }}
                          >
                            <div className="flex items-center gap-[8px]">
                              <div className="">
                                <Icon
                                  name={`chain/${
                                    chains.find(
                                      items => items.value === item.value
                                    )?.value
                                  }`}
                                  className="w-[16px] h-[16px]"
                                />
                              </div>

                              {item.name}
                            </div>
                          </Dropdown.Item>
                        ))}
                      </>
                    }
                  >
                    <div className="w-[3rem] h-[3rem] bg-[url('/image/chan.png')]  bg-no-repeat bg-full flex items-center justify-center">
                      <Icon
                        name={network ? `chain/${network.value}` : ''}
                        className="w-[20px] h-[20px]"
                      />
                    </div>
                  </Dropdowns>
                )}
                {urlParmas.v ? (
                  <>
                    {address && <Box>{ellipsisMiddle(address, 6, 6)}</Box>}
                    {address ? (
                      <Buttons
                        className="uppercase max-w-[160px]"
                        onClick={() => dispatch(disconnect())}
                      >
                        {t('public.disconnect')}
                      </Buttons>
                    ) : (
                      <Buttons
                        loading={loaderWalletStatus}
                        className="uppercase max-w-[160px]"
                        onClick={() => {
                          setWalletStatus(true)
                        }}
                      >
                        {t('public.connect')}
                      </Buttons>
                    )}
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className="col-span-12 grid sm:flex gap-[48px] sm:gap-[16px] sm:justify-between mt-[8px] sm:mt-[0]">
                <HeaderTitle className="order-2 sm:!order-1">
                  {t('public.bind')}
                </HeaderTitle>
              </div>
              <div className="col-span-12">
                <Segmentation
                  onChange={e => setChainValue(e)}
                  value={chainValue}
                  data={chain.map(itme =>
                    Object.assign(
                      {},
                      {
                        name: itme,
                        value: itme,
                      }
                    )
                  )}
                />
              </div>
              <div className="col-span-12">{getAddressBox()}</div>
            </div>
          </div>
        </div>
        {Config.status && (
          <div className="z-[1] col-span-12 grid mt-[48px] gap-[16px]">
            <div className="col-span-12">
              <HeaderTitle>{t('public.donate')}</HeaderTitle>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-[16px]">
              <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <PisSvg
                  buyStatus="min"
                  status="popular"
                  quantity={1000}
                  price={2.99}
                />
              </div>
              <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <PisSvg
                  buyStatus="max"
                  status="best"
                  quantity={3000}
                  price={6.99}
                />
              </div>
              <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <PisSvg buyStatus="max-full" quantity={5000} price={9.99} />
              </div>
              <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <PisSvg buyStatus="max-full" quantity={5000} price={9.99} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}
