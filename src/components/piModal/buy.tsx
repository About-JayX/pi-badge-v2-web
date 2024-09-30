import "./index.css";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import { ButtonB } from "../buttons";
import Icon from "../icon";

export default function Buy({
  open = false,
  onHide,
}: {
  open?: boolean;
  onHide?: () => void;
}) {
  const { t } = useTranslation();
  const [bindLoading, setBindLoading] = useState(false);
  return (
    <Modal
      show={open}
      onHide={onHide}
      centered
      dialogClassName="modal-animation"
    >
      <Modal.Header closeButton>
        <span className="!text-base">{t("public.butText")}</span>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="grid w-full text-center gap-3">
          <span className="text-2xl font-bold text-[#48B7F2]">
            <Icon name="pis/gold" className="w-11 h-11 mr-1" />
            999,999.00 PIS
          </span>
          <div className="flex gap-2 items-center justify-between text-base font-normal">
            <span className="text-[#718096]">{t("public.pay")}:</span>
            <span>100 USDT</span>
          </div>
          <div className="flex w-full overflow-x-auto justify-center ">
            <ButtonB
              onClick={async () => {
                setBindLoading(true);
              }}
              loading={bindLoading}
            >
              {t("public.ok")}
            </ButtonB>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
