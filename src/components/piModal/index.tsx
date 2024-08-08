import './index.css'

import Modal from 'react-bootstrap/Modal'

import Button from '../button'
// import { useTranslation } from "react-i18next";

// import { MessageSuccess } from "@/components/message";
// import { Text } from '@/components/text'
// import { HeaderTitle } from '@/components/title'
export default function PiModal({
  open = false,
  setWalletOpen,
}: {
  open?: boolean
  setWalletOpen: (status: boolean) => void
}) {
  
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
          <span className="text-[32px]">是否绑定Pi浏览器</span>
          <span className="mt-[-1rem] text-[18px]">
            Open Wallet in Telegram or select your wallet to connect
          </span>
          <div className="grid w-full gap-6 overflow-x-auto justify-center grid-flow-col grid-cols-[repeat(2,1fr)]">
            <Button>绑定</Button>
            <Button>取消</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
