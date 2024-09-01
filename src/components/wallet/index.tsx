import './index.css'

import Modal from 'react-bootstrap/Modal'

import { useStoreDispatch } from '@/hook'
import { connectWallet } from '@/hook/ethers'
// import { useTranslation } from "react-i18next";

// import { MessageSuccess } from "@/components/message";
// import { Text } from '@/components/text'
// import { HeaderTitle } from '@/components/title'
export default function Wallet({
  open = false,
  setWalletOpen,
}: {
  open?: boolean
  setWalletOpen: (status: boolean) => void
  getUrl: () => string
}) {
  const dispatch = useStoreDispatch()
  // const { t } = useTranslation();
  const swapList = [
    {
      text: 'TP',
      src: '/image/wallet/tp.png',
      click: () => {
        // const urlData = {
        //   url: getUrl(),
        // };
        // const url = encodeURIComponent(JSON.stringify(urlData));
        // window.open(`tpdapp://open?params=${url}`);
        dispatch(connectWallet({ name: 'tokenpocket' }))
      },
    },
    {
      text: 'OKX',
      src: '/image/wallet/okx.png',
      click: () => {
        // const deepLink =
        //   "okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(getUrl());
        // const encodedUrl =
        //   "https://www.okx.com/download?deeplink=" +
        //   encodeURIComponent(deepLink);
        // window.open(encodedUrl);
        dispatch(connectWallet({ name: 'okex' }))
      },
    },
    {
      text: 'MateMask',
      src: '/image/wallet/metamask.png',
      click: () => {
        dispatch(connectWallet({ name: 'ethereum' }))
      },
    },
    {
      text: 'Bitget',
      src: '/image/wallet/bitget.png',
      click: () => {
        dispatch(connectWallet({ name: 'bitkeep' }))
      },
    },
    {
      text: 'phantom',
      src: '/image/wallet/phantom.png',
      click: () => {
        dispatch(connectWallet({ name: 'phantom' }))
      },
    },
  ]
  return (
    <Modal
      show={open}
      onHide={() => setWalletOpen(false)}
      centered
      dialogClassName="modal-animation"
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="grid w-full text-center gap-6">
          <span className="text-[32px]">Connect your wallet</span>
          <span className="mt-[-1rem] text-[18px]">
            Open Wallet in Telegram or select your wallet to connect
          </span>
          <div className="flex w-full gap-6 overflow-x-auto justify-center">
            {swapList.map((item, index) => (
              <a
                key={index}
                className="grid gap-1 w-min"
                onClick={() => item.click && item.click()}
              >
                <div className="w-[3.75rem] h-[3.75rem]">
                  <img src={item.src} alt="" className=" rounded" />
                </div>
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {item.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
