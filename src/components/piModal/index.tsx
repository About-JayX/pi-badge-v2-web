import './index.css'

import Modal from 'react-bootstrap/Modal'

import Button from '../button'
import { useTranslation } from 'react-i18next'
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
  bind: () => void
}) {
  const { t } = useTranslation()
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
          <div className="grid w-full gap-6 overflow-x-auto justify-center grid-flow-col grid-cols-[repeat(2,1fr)]">
            <Button onClick={bind}>{t('public.bind')}</Button>
            <Button onClick={() => setWalletOpen(false)}>
              {t('public.cancel')}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
