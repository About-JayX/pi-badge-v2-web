import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { bindPidAPI, findInfoAPI } from '@/axios/api'
import { useStoreDispatch, useStoreSelector } from '@/hook'
import { updatepidUserInfo } from '@/store/ethers'
import { getUrlParams } from '@/util'

import { ButtonB } from '../buttons'
import Icon from '../icon'
import Input from '../input'
import { MessageError, MessageSuccess } from '../message'
import { Text } from '../text'

export default function GetBindCode({
  open = false,
  onHide,
  url = '',
}: {
  open?: boolean
  onHide?: (status: boolean) => void
  url?: string
}) {
  // pidUserInfo request api message // piUser piBrowser message
  const [pidKey, setPidKey] = useState('')

  const [accessToken, setAccessToken] = useState('')
  const { pidUserInfo, piUser } = useStoreSelector(state => state.ethers)
  const [params, setParams] = useState<any>(null)
  const dispatch = useStoreDispatch()
  const [bindLoading, setBinding] = useState(false)
  const getBind = async (pidKey: any, code: any) => {
    setBinding(true)
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
    setBinding(false)
  }
  useEffect(() => {
    setPidKey(
      (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Pid) || ''
    )
  }, [pidUserInfo])
  useEffect(() => {
    setAccessToken((piUser && piUser.accessToken) || '')
  }, [piUser])

  useEffect(() => {
    setParams((location.search && getUrlParams(location.search)) || null)
  }, [location.search])

  const { t } = useTranslation()
  return (
    <Modal
      show={open}
      centered
      dialogClassName="modal-animation"
      onHide={() => onHide && onHide(false)}
    >
      <Modal.Header closeButton>
        <span className="text-[16px] opacity-65">{t('piModal.title')}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="grid gap-4 w-full items-center justify-items-center">
          <div className="w-full grid gap-4 text-center">
            {params && params.v && !pidKey ? (
              <Text className="text-[#A7BBCA]">{t('public.isBind')}</Text>
            ) : (
              <Text className="text-[#A7BBCA]">{t('piModal.text')}</Text>
            )}
            {params && params.v && !pidKey ? (
              <div className="w-full grid gap-2 text-center">
                <Text className="!font-normal !text-[#A7BBCA]">
                  ({accessToken})
                </Text>
                <ButtonB
                  loading={bindLoading}
                  onClick={() => {
                    getBind(accessToken, params.v || '')
                  }}
                >
                  {t('public.bind')}
                </ButtonB>
              </div>
            ) : (
              <div>
                <Input
                  value={accessToken}
                  disabled
                  button={{
                    text: t('public.copy'),
                    onClick: () => {},
                    show: true,
                    copy: true,
                    copyText: accessToken,
                  }}
                />
                <a href={url} target="_blank">
                  <Text
                    className="items-center text-[#48B7F2] justify-center mt-2"
                    style={{ display: 'block' }}
                  >
                    {t('piModal.miniProgramText')} <Icon name="link" />
                  </Text>
                </a>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
