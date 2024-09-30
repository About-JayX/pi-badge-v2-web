import './index.css'

import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'

import { ButtonB } from '../buttons'
import Icon from '../icon'
import { semicolon } from '@/util'

export default function Buy({
  open = false,
  onHide,
  buyPis,
  buyItem,
}: {
  open?: boolean
  onHide?: (bool: any) => void
  buyPis?: (item: any) => Promise<any>
  buyItem?: any
}) {
  const { t } = useTranslation()
  const [bindLoading, setBindLoading] = useState(false)
  return (
    <Modal
      show={open}
      onHide={() => {
        onHide && onHide(false)
      }}
      centered
      dialogClassName="modal-animation"
    >
      <Modal.Header closeButton>
        <span className="!text-base">{t('public.butText')}</span>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="grid w-full text-center gap-3">
          <span className="text-2xl font-bold text-[#48B7F2]">
            <Icon name="pis/gold" className="w-11 h-11 mr-1" />
            {buyItem && semicolon(buyItem.amount)} PIS
          </span>
          <div className="flex gap-2 items-center justify-between text-base font-normal">
            <span className="text-[#718096]">{t('public.pay')}:</span>
            <span>{buyItem && semicolon(buyItem.price)} USDT</span>
          </div>
          <div className="flex w-full overflow-x-auto justify-center ">
            <ButtonB
              onClick={async () => {
                setBindLoading(true)
                try {
                  const result = buyPis && (await buyPis(buyItem))
                  onHide && onHide(false)
                } catch (error) {
                  console.log(error, 'error_')
                }

                setBindLoading(false)
              }}
              loading={bindLoading}
            >
              {t('public.ok')}
            </ButtonB>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
