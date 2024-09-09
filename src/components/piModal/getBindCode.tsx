import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Icon from "../icon";
import Input from "../input";
import { Text } from "../text";

export default function GetBindCode({
  open = false,
  onHide,
  url = "",
  code = "",
}: {
  open?: boolean;
  onHide?: (status: boolean) => void;
  url?: string;
  code?: string;
}) {
  const { t } = useTranslation();
  return (
    <Modal
      show={open}
      centered
      dialogClassName="modal-animation"
      onHide={() => onHide && onHide(false)}
    >
      <Modal.Header closeButton>
        <span className="text-[16px] opacity-65">{t("piModal.title")}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="grid gap-4 w-full items-center justify-items-center">
          <div className="w-full grid gap-4 text-center">
            <Text className="text-[#A7BBCA]">{t("piModal.text")}</Text>
            <Input
              value={code}
              disabled
              button={{
                text: t("public.copy"),
                onClick: () => {},
                show: true,
                copy: true,
                copyText: code,
              }}
            />
            <a href={url} target="_blank">
              <Text
                className="items-center text-[#48B7F2] justify-center"
                style={{ display: "ruby" }}
              >
                {t("piModal.miniProgramText")} <Icon name="link" />
              </Text>
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
