import './index.css'

import Modal from 'react-bootstrap/Modal'

import Button from '../button'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import Buttons from '../buttons'
// import { useTranslation } from "react-i18next";

// import { MessageSuccess } from "@/components/message";
// import { Text } from '@/components/text'
// import { HeaderTitle } from '@/components/title'
export default function PiModal({
  open = false,
  setWalletOpen,
  bind,
}: {
  open?: boolean
  setWalletOpen: (status: boolean) => void
  bind: () => Promise<any>
}) {
  const { t } = useTranslation()
  const [bindLoading, setBindLoading] = useState(false)
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
          <span className="text-[32px]">{t('public.isBind')}</span>
          <span className="mt-[-1rem] text-[18px]">
            {t('public.openWallet')}
          </span>
          <div className="flex w-full overflow-x-auto justify-center ">
            <Buttons
              onClick={async () => {
                setBindLoading(true)
                await bind()
                setBindLoading(false)
              }}
              loading={bindLoading}
            >
              {t('public.bind')}
            </Buttons>
            {/* <Buttons onClick={() => setWalletOpen(false)}>
              {t('public.cancel')}
            </Buttons> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
  