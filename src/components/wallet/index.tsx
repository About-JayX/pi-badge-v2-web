import "./index.css";

import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

import { useStoreDispatch } from "@/hook";
import { connectWallet } from "@/hook/ethers";

import { MessageError, MessageSuccess } from "../message";

export default function Wallet({
  open = false,
  setWalletOpen,
  setLoaderWalletStatus,
}: {
  open?: boolean;
  setWalletOpen: (status: boolean) => void;
  getUrl: () => string;
  setLoaderWalletStatus?: (item: boolean) => void;
}) {
  const dispatch = useStoreDispatch();
  const { t } = useTranslation();
  const swapList = [
    {
      text: "TP",
      src: "/image/wallet/tp.png",
      click: async () => {
        setLoaderWalletStatus && setLoaderWalletStatus(true);
        const result = await dispatch(connectWallet({ name: "tokenpocket" }));
        setLoaderWalletStatus && setLoaderWalletStatus(false);
        result.payload
          ? MessageSuccess(t("message.connect.success"))
          : MessageError(t("message.connect.fail"));
      },
    },
    {
      text: "OKX",
      src: "/image/wallet/okx.png",
      click: async () => {
        setLoaderWalletStatus && setLoaderWalletStatus(true);
        const result = await dispatch(connectWallet({ name: "okex" }));
        setLoaderWalletStatus && setLoaderWalletStatus(false);
        result.payload
          ? MessageSuccess(t("message.connect.success"))
          : MessageError(t("message.connect.fail"));
      },
    },
    {
      text: "MateMask",
      src: "/image/wallet/metamask.png",
      click: async () => {
        setLoaderWalletStatus && setLoaderWalletStatus(true);
        const result = await dispatch(connectWallet({ name: "ethereum" }));
        setLoaderWalletStatus && setLoaderWalletStatus(false);
        result.payload
          ? MessageSuccess(t("message.connect.success"))
          : MessageError(t("message.connect.fail"));
      },
    },
    {
      text: "Bitget",
      src: "/image/wallet/bitget.png",
      click: async () => {
        setLoaderWalletStatus && setLoaderWalletStatus(true);
        const result = await dispatch(connectWallet({ name: "bitkeep" }));
        setLoaderWalletStatus && setLoaderWalletStatus(false);
        result.payload
          ? MessageSuccess(t("message.connect.success"))
          : MessageError(t("message.connect.fail"));
      },
    },
    {
      text: "phantom",
      src: "/image/wallet/phantom.png",
      click: async () => {
        setLoaderWalletStatus && setLoaderWalletStatus(true);
        const result = await dispatch(connectWallet({ name: "phantom" }));
        setLoaderWalletStatus && setLoaderWalletStatus(false);
        result.payload
          ? MessageSuccess(t("message.connect.success"))
          : MessageError(t("message.connect.fail"));
      },
    },
  ];
  return (
    <Modal show={open} onHide={() => setWalletOpen(false)} centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="grid w-full text-center gap-6">
          <span className="text-[30px]">{t("wallet.title")}</span>
          <span className="mt-[-1rem] text-[16px]">{t("wallet.text")}</span>
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
