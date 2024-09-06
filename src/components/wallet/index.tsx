import "./index.css";

import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import { useStoreDispatch } from "@/hook";
import { connectWallet } from "@/hook/ethers";

import { MessageError, MessageSuccess } from "../message";

// import { MessageSuccess } from "@/components/message";
// import { Text } from '@/components/text'
// import { HeaderTitle } from '@/components/title'
export default function Wallet({
  open = false,
  setWalletOpen,
}: {
  open?: boolean;
  setWalletOpen: (status: boolean) => void;
  getUrl: () => string;
}) {
  const dispatch = useStoreDispatch();
  const { t } = useTranslation();
  const swapList = [
    {
      text: "TP",
      src: "/image/wallet/tp.png",
      click: () => {
        // const urlData = {
        //   url: getUrl(),
        // };
        // const url = encodeURIComponent(JSON.stringify(urlData));
        // window.open(`tpdapp://open?params=${url}`);
        dispatch(connectWallet({ name: "tokenpocket" })).then(() =>
          MessageSuccess(t("message.connect.success"))
        );
      },
    },
    {
      text: "OKX",
      src: "/image/wallet/okx.png",
      click: () => {
        // const deepLink =
        //   "okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(getUrl());
        // const encodedUrl =
        //   "https://www.okx.com/download?deeplink=" +
        //   encodeURIComponent(deepLink);
        // window.open(encodedUrl);
        dispatch(connectWallet({ name: "okex" }))
          .then(() => MessageSuccess(t("message.connect.success")))
          .catch(() => MessageError(t("message.connect.success")));
      },
    },
    {
      text: "MateMask",
      src: "/image/wallet/metamask.png",
      click: () => {
        dispatch(connectWallet({ name: "ethereum" }))
          .then(() => MessageSuccess(t("message.connect.success")))
          .catch(() => MessageError(t("message.connect.success")));
      },
    },
    {
      text: "Bitget",
      src: "/image/wallet/bitget.png",
      click: () => {
        dispatch(connectWallet({ name: "bitkeep" }))
          .then(() => MessageSuccess(t("message.connect.success")))
          .catch(() => MessageError(t("message.connect.success")));
      },
    },
    {
      text: "phantom",
      src: "/image/wallet/phantom.png",
      click: () => {
        dispatch(connectWallet({ name: "phantom" }))
          .then(() => MessageSuccess(t("message.connect.success")))
          .catch(() => MessageError(t("message.connect.success")));
      },
    },
  ];
  return (
    <Modal show={open} onHide={() => setWalletOpen(false)} centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="grid w-full text-center gap-6">
          <span className="text-[30px]">{t("wallet.title")}</span>
          <span className="mt-[-1rem] text-[16px]">
          {t("wallet.text")}
            
          </span>
          <div className="grid w-full gap-6 justify-items-center grid-cols-4 sm:grid-cols-5">
            {swapList.map((item, index) => (
              <a
                key={index}
                className="grid gap-1 justify-items-center items-center"
                onClick={() => item.click && item.click()}
              >
                <div className="w-[3.36rem] h-[3.36rem] sm:w-[3.75rem] sm:h-[3.75rem]">
                  <img src={item.src} alt="" className=" rounded" />
                </div>
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-[16px]">
                  {item.text}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
