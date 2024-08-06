import './index.css'

import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'

import { MessageSuccess } from '@/components/message'
// import { Text } from '@/components/text'
// import { HeaderTitle } from '@/components/title'
export default function Wallet({
  open = false,
  setWalletOpen,
  getUrl,
}: {
  open?: boolean
  setWalletOpen: (status: boolean) => void
  getUrl: () => string
}) {
  const { t } = useTranslation()
  const swapList = [
    {
      text: 'TP',
      src: '/image/wallet/tp.png',
      click: () => {
        const urlData = {
          url: getUrl(),
        }
        const url = encodeURIComponent(JSON.stringify(urlData))
        window.open(`tpdapp://open?params=${url}`)
      },
    },
    {
      text: 'OKX',
      src: '/image/wallet/okx.png',
      click: () => {
        const deepLink =
          'okx://wallet/dapp/url?dappUrl=' + encodeURIComponent(getUrl())
        const encodedUrl =
          'https://www.okx.com/download?deeplink=' +
          encodeURIComponent(deepLink)
        window.open(encodedUrl)
      },
    },
    {
      text: 'MateMask',
      src: '/image/wallet/metamask.png',
      click: () => {
        window.open(
          `https://metamask.app.link/dapp/${getUrl().replace('https://', '')}`
        )
      },
    },
    {
      text: 'Bitget',
      src: '/image/wallet/bitget.png',
      click: () => {
        window.open(`https://bkcode.vip?action=dapp&url=${getUrl()}`)
      },
    },
    {
      text: 'phantom',
      src: '/image/wallet/phantom.png',
      click: () => {
        window.open(
          `https://phantom.app/ul/browse/${encodeURIComponent(getUrl())}`
        )
      },
    },
    {
      text: 'copy',
      src: '/image/wallet/copy.png',
      click: () => {
        navigator.clipboard.writeText(getUrl())
        MessageSuccess(t('message.copy.success'))
      },
    },
  ]
  return (
    <Modal
      show={open}
      onHide={() => setWalletOpen(false)}
      centered
      // fullscreen
      dialogClassName="modal-animation"
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="grid w-full text-center gap-6">
          <span className='text-[32px]'>Connect your wallet</span>
          <span className="mt-[-1rem] text-[18px]">
            Open Wallet in Telegram or select your wallet to connect
          </span>
          <div className="flex w-full gap-6 overflow-x-auto">
            {swapList.map((item, index) => (
              <div
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
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
