// import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js'
import "./index.css";

import {
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  MintLayout,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import * as solanaWeb3 from "@solana/web3.js";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import Decimal from "decimal.js";
import { ethers } from "ethers";
import { Fragment, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
// import { disconnect, switchNetwork } from "@/hook/ethers";
import { useTranslation } from "react-i18next";
import Web3 from "web3";

import SuccessDonePng from "@/assets/image/success.png";
import SuccessNonePng from "@/assets/image/success-none.png";
import {
  bindWallet,
  createOrderAPI,
  findInfoAPI,
  payListAPI,
} from "@/axios/api";
import Box from "@/components/box";
import { ButtonB } from "@/components/buttons";
import Dropdowns from "@/components/dropdown";
import { HeaderTitle } from "@/components/header";
import Icon from "@/components/icon";
import { MessageError, MessageSuccess } from "@/components/message";
import Buy from "@/components/piModal/buy";
import GetBindCode from "@/components/piModal/getBindCode";
import Segmentation from "@/components/segmentation";
import Wallet from "@/components/wallet";
import Config from "@/config";
import miniProgramUrl from "@/config/miniProgramUrl";
import telegramBotUrl from "@/config/telegramBotUrl";
import erc20ABI from "@/contract/erc20";
import { useStoreDispatch, useStoreSelector } from "@/hook";
import { disconnect, switchNetwork } from "@/hook/ethers";
import {
  updateAddress,
  updatepageNetworkId,
  updatepidUserInfo,
  updateWalletStatus,
} from "@/store/ethers";
import { ellipsisMiddle, getUrlParams, semicolon } from "@/util";
const PisSvg = ({
  status = "",
  buyStatus = "min",
  price = 0,
  quantity = 0,
  name = "USD",
}: {
  status?: "popular" | "best" | "";
  buyStatus?: "min" | "max" | "max-full";
  price?: number;
  quantity?: number;
  name: string;
}) => {
  return (
    <svg viewBox="0 0 249 268">
      <image
        x="2.5"
        y="2.5"
        width="calc(100% - 2.5px)"
        height="calc(100% - 2.5px)"
        preserveAspectRatio="xMidYMid slice"
        xlinkHref={`/image/pis/bg-${buyStatus}.png`}
      />
      {status && (
        <>
          <image
            x="0"
            y="0"
            className="w-[90px] h-[20px]"
            preserveAspectRatio="xMidYMid slice"
            xlinkHref={`/image/pis/${status}.png`}
          />
          <text x="5" y="16" fill="#fff" className="text-[12px] uppercase">
            {status}
          </text>
        </>
      )}
      <foreignObject
        x="0"
        y="150"
        width="100%"
        height={60}
        className="text-end pr-[18px] grid items-center"
      >
        <span className="text-[#87E7FF] text-[16px]">Pis</span>
        <span className="text-[#DEAD2E] text-[22px] mt-[-3px]">
          {semicolon(quantity)}
        </span>
      </foreignObject>
      <foreignObject
        x="0"
        y="222.5"
        width="100%"
        height={30}
        className="text-end pr-[18px] text-[20px]"
      >
        <div className="flex w-full justify-end gap-[6px]">
          <span className="text-[#4489C6]">{name}</span>
          <span className="text-[#CFE7F7]">${semicolon(price)}</span>
        </div>
      </foreignObject>
    </svg>
  );
};

const Pis = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205 205" id="Pis">
      <g style={{ order: -1 }}>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="1"
          stroke="#48B7F2"
          fill="none"
          points="70,70 148,50 130,130 50,150"
          id="bounce"
        ></polygon>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="1"
          stroke="#48B7F2"
          fill="none"
          points="70,70 148,50 130,130 50,150"
          id="bounce2"
        ></polygon>
        <polygon
          transform="rotate(45 100 100)"
          strokeWidth="2"
          stroke=""
          fill="#414750"
          points="70,70 150,50 130,130 50,150"
        ></polygon>
        <polygon
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente)"
          points="100,70 150,100 100,130 50,100"
        ></polygon>
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente">
            <stop
              style={{ stopColor: "#1e2026", stopOpacity: 1 }}
              offset="20%"
            ></stop>
            <stop
              style={{ stopColor: "#414750", stopOpacity: 1 }}
              offset="60%"
            ></stop>
          </linearGradient>
        </defs>
        <polygon
          transform="translate(20, 31)"
          strokeWidth="2"
          stroke=""
          fill="#0460B2"
          points="80,50 80,75 80,99 40,75"
        ></polygon>
        <polygon
          transform="translate(20, 31)"
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente2)"
          points="40,-40 80,-40 80,99 40,75"
        ></polygon>
        <defs>
          <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id="gradiente2">
            <stop
              style={{ stopColor: "#1c8dc900", stopOpacity: 1 }}
              offset="20%"
            ></stop>
            <stop
              style={{ stopColor: "#48B7F2", stopOpacity: 1 }}
              offset="100%"
              id="animatedStop"
            ></stop>
          </linearGradient>
        </defs>
        <polygon
          transform="rotate(180 100 100) translate(20, 20)"
          strokeWidth="2"
          stroke=""
          fill="#48B7F2"
          points="80,50 80,75 80,99 40,75"
        ></polygon>
        <polygon
          transform="rotate(0 100 100) translate(60, 20)"
          strokeWidth="2"
          stroke=""
          fill="url(#gradiente3)"
          points="40,-40 80,-40 80,85 40,110.2"
        ></polygon>
        <defs>
          <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id="gradiente3">
            <stop
              style={{ stopColor: "#1c8dc900", stopOpacity: 1 }}
              offset="20%"
            ></stop>
            <stop
              style={{ stopColor: "#48B7F2", stopOpacity: 1 }}
              offset="100%"
              id="animatedStop"
            ></stop>
          </linearGradient>
        </defs>
        <polygon
          transform="rotate(45 100 100) translate(80, 95)"
          strokeWidth="2"
          stroke=""
          fill="#ffffff7b"
          points="5,0 5,5 0,5 0,0"
          id="particles"
        ></polygon>
        <polygon
          transform="rotate(45 100 100) translate(80, 55)"
          strokeWidth="2"
          stroke=""
          fill="#ffffff7b"
          points="6,0 6,6 0,6 0,0"
          id="particles"
        ></polygon>
        <polygon
          transform="rotate(45 100 100) translate(70, 80)"
          strokeWidth="2"
          stroke=""
          fill="#ffffff7b"
          points="2,0 2,2 0,2 0,0"
          id="particles"
        ></polygon>
        <polygon
          strokeWidth="2"
          stroke=""
          fill="#292d34"
          points="29.5,99.8 100,142 100,172 29.5,130"
        ></polygon>
        <polygon
          transform="translate(50, 92)"
          strokeWidth="2"
          stroke=""
          fill="#1f2127"
          points="50,50 120.5,8 120.5,35 50,80"
        ></polygon>
      </g>
      <image
        x="72.5"
        y="25"
        id="bounce3"
        className="w-[50px] h-[50px]"
        preserveAspectRatio="xMidYMid slice"
        xlinkHref={`/logos.svg`}
      />
    </svg>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const { address, piUser, pidUserInfo, networkId } = useStoreSelector(
    (state) => state.ethers
  );
  const dispatch = useStoreDispatch();
  const [chain, setChain] = useState(["Pi"]);
  const [chainValue, setChainValue] = useState<string>(chain?.[0]);
  const chains = [
    { name: "SOL", value: "solana", chainId: -1 },
    { name: "ETH", value: "eth", chainId: 1 },
    { name: "BSC", value: "bsc", chainId: 56 },
  ];
  const [network, setNetwork] = useState<any>(chains[0]);
  const [chainValues, setChainValues] = useState("eth");
  const [walletStatus, setWalletStatus] = useState<boolean>(false);
  const [loaderWalletStatus, setLoaderWalletStatus] = useState(false);
  const [urlParmas, setUrlParams] = useState<any>({});
  const [payList, setpayList] = useState([]);
  const [cfWallet, setCfWallet] = useState([]);
  const [buyModal, setBuyModal] = useState(false);

  const [buyItem, setBuyItem] = useState<any>(null);
  const [order, setOrder] = useState({
    memo: null,
    price: null,
    Trantokenaddress: null,
    Trantokendecimals: null,
  });
  const bindERC20Wallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      if (window.ethereum.isMetaMask) {
        console.log("Using MetaMask");
      } else if (window.ethereum.isBitget) {
        console.log("Using Bitget Wallet");
      } else if (window.ethereum.isOkxWallet) {
        console.log("Using OKX Wallet");
      } else {
        console.log("Using an unknown Ethereum wallet");
      }
      const params = getUrlParams(location.search);

      const token = params.v;
      try {
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        const message = `Binding EVM Address: User is ${token}, Wallet Address is ${address.toLowerCase()}, Please Confirm The Sign`;
        const signature = await web3.eth.personal.sign(message, address, "");

        const res = await bindWallet({
          address,
          user: token,
          signature,
          message,
          type: "erc20",
        });
      } catch (error) {
        throw new Error("reject transaction");
      }
    } else {
      throw new Error("install erc20 wallet");
    }
  };

  const bindSolanaWallet = async () => {
    try {
      const wallet = window.solana;

      if (!wallet) {
        throw new Error("install solana wallet");
      }

      await wallet.connect();
      const publicKey = wallet.publicKey.toString();
      const params = getUrlParams(location.search);
      const token = params.v;
      const message = `Binding SOL Address: User is ${token}, Wallet Address is ${publicKey.toLowerCase()}, Please Confirm The Sign`;
      const encodedMessage = new TextEncoder().encode(message);
      const signatureObj = await wallet.signMessage(encodedMessage);
      const signature = Array.from(signatureObj.signature);
      await bindWallet({
        address: publicKey,
        type: "solana",
        signature,
        message: Array.from(encodedMessage),
        user: token,
      });
    } catch (error) {
      throw new Error("install erc20 wallet");
    }
  };
  const [bindStatus, setBindStatus] = useState(false);
  const [bnidCodeStatus, setBnidCodeStatus] = useState(false);

  const getAddressBox = () => {
    const params = getUrlParams(location.search);
    const type = params.t ? params.t : chain[0];

    let data: any = "";
    if (chainValue === "ETH/BSC") {
      data =
        (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Erc20) ||
        "";
    }
    if (chainValue === "Solana") {
      data =
        (pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Sonala) ||
        "";
    }

    const bind = async () => {
      try {
        setBindStatus(true);
        if (chainValue === "ETH/BSC") {
          await bindERC20Wallet();
        }
        if (chainValue === "Solana") {
          await bindSolanaWallet();
        }

        await init(type);
        MessageSuccess(t("message.bind.success"));
      } catch (error) {
        MessageError(t("message.bind.fail"));
      }
      setBindStatus(false);
    };

    return chainValue === "Pi" ? (
      <>
        {/* {piUser && piUser.accessToken ? (
          pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Pid ? (
            <Box>
              <Icon name="piNetwork" className="w-[26px] h-[26px]" />
              {ellipsisMiddle(pidUserInfo.BindInfo.Pid, 8)}
              {<img src={SuccessDonePng} className="w-[22px] h-[16px]" />}
            </Box>
          ) : (
            <Buttons onClick={() => setBnidCodeStatus(true)}>
              {t('public.bind')}
            </Buttons>
          )
        ) : (
          <Box>
            <Icon name="piNetwork" className="w-[26px] h-[26px]" />
            {t('public.piBrowserText')}
          </Box>
        )} */}
        {pidUserInfo && pidUserInfo.BindInfo && pidUserInfo.BindInfo.Pid ? (
          <Box>
            <Icon name="piNetwork" className="w-[26px] h-[26px]" />
            {ellipsisMiddle(pidUserInfo.BindInfo.Pid, 8)}
            {<img src={SuccessDonePng} className="w-[22px] h-[16px]" />}
          </Box>
        ) : piUser && piUser.accessToken ? (
          <ButtonB onClick={() => setBnidCodeStatus(true)}>
            {t("public.bind")}
          </ButtonB>
        ) : (
          <Box>
            <Icon name="piNetwork" className="w-[26px] h-[26px]" />
            {t("public.piBrowserText")}
          </Box>
        )}
      </>
    ) : data ? (
      <Box>
        <Icon
          name={
            chainValue === "Solana"
              ? "sol"
              : "" || chainValue === "ETH/BSC"
              ? "wallet"
              : "" || chainValue === "Pi"
              ? "piNetwork"
              : ""
          }
          className="w-[26px] h-[26px]"
        />
        <span>{data && ellipsisMiddle(data, 9)}</span>
        <img
          src={data ? SuccessDonePng : SuccessNonePng}
          className="w-[22px] h-[16px]"
        />
      </Box>
    ) : (
      <ButtonB onClick={() => bind()} loading={bindStatus}>
        {t("public.bind")}
      </ButtonB>
    );
  };
  useEffect(() => {
    if (address) {
      setWalletStatus(false);
    }
  }, [address]);

  useEffect(() => {
    const params = getUrlParams(location.search);
    setChain(["Solana", "ETH/BSC", "Pi"]);
    if (!Object.keys(piUser).length && params.v) {
      setNetwork((_: any) => {
        const obj: any =
          chains.find((item: any) => networkId === item.chainId) || {};

        getPayList(obj.value === "solana" ? "sol" : obj.value);

        dispatch(switchNetwork(obj.chainId ? obj.chainId : 1)).then(() => {
          setChainValues(obj.value ? obj.value : "eth");
        });
        return obj;
      });
      setChainValue("ETH/BSC");
      setUrlParams(params);
      init();
    } else {
      setChain(["Pi"]);
      setChainValue("Pi");
      init();
    }
  }, [piUser]);

  const getPayList = async (chain: string) => {
    const pays: any = await payListAPI({
      chain,
      page: 1,
      limit: 10,
    });
    setpayList((pays && pays.goods && pays.goods.goods) || []);
    setCfWallet((pays && pays.wallets) || []);
  };
  const getTokenAccount = async (
    connection: solanaWeb3.Connection,
    walletAddress: solanaWeb3.PublicKey,
    mintAddress: solanaWeb3.PublicKey
  ) => {
    try {
      const account = await getAssociatedTokenAddress(
        mintAddress,
        walletAddress
      );

      const tokenAccount = (await connection.getAccountInfo(
        mintAddress
      )) as solanaWeb3.AccountInfo<Buffer>;
      const decoded = MintLayout.decode(tokenAccount.data);
      const info = await getAccount(connection, account);
      const bal = new Decimal(info.amount.toString());

      return bal
        .div(new Decimal(10).pow(decoded.decimals))
        .toFixed(decoded.decimals);
    } catch (error) {
      console.error("search token error:", error);
    }
  };
  const createOrder = async (
    goodsId: string,
    goodsToken: string,
    goodsDecimals: number,
    type: string,
    contract?: any
  ) => {
    try {
      if (type === "erc20") {
        const wallet = window.ethereum;
        if (!wallet) {
          MessageError(t("message.installWallet"));
          return;
        }
      } else {
        const wallet = window.solana;
        if (!wallet) {
          MessageError(t("message.installWallet"));
          return;
        }
      }
      const { memo, price } = (await createOrderAPI({
        goodsId,
        code: urlParmas.v,
      })) as any;

      const o: any = {
        Trantokenaddress: goodsToken,
        Trantokendecimals: goodsDecimals,
        memo,
        price,
      };
      setOrder(o);

      if (type === "erc20") {
        await simulateErc20TokenTransfer(
          goodsToken,
          goodsDecimals,
          memo,
          price,
          contract
        );
      } else {
        await simulateSolTokenTransfer(goodsToken, goodsDecimals, memo, price);
      }
    } catch (error) {
      console.error("create order error:", error);
    }
  };
  const simulateErc20TokenTransfer = async (
    goodsToken: any,
    goodsDecimals: any,
    memo: any,
    price: any,
    contract: any
  ) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const amount = ethers.utils.parseUnits(price, goodsDecimals);
      const data = ethers.utils.defaultAbiCoder.encode(["string"], [memo]);
      const tx = {
        to: goodsToken,
        data:
          contract.interface.encodeFunctionData("transfer", [
            cfWallet[0]["address"],
            amount,
          ]) + data.substring(2),
      };

      const transactionResponse = await signer.sendTransaction(tx);
      await transactionResponse.wait();
      MessageSuccess(t("message.pay.success"));
      setOrder({
        memo: null,
        price: null,
        Trantokenaddress: null,
        Trantokendecimals: null,
      });
    } catch (error) {
      MessageError(t("message.pay.fail"));
      console.error("pay error:", error);
    } finally {
    }
  };

  const simulateSolTokenTransfer = async (
    Trantokenaddress: any,
    Trantokendecimals: any,
    memo: any,
    price: any
  ) => {
    try {
      const wallet = window.solana;
      await wallet.connect();
      const RPC_ENDPOINT =
        "https://mainnet.helius-rpc.com/?api-key=52c52f4f-d495-4210-a339-3d0dc3dd4c9f";
      const RPC_WEBSOCKET_ENDPOINT =
        "wss://mainnet.helius-rpc.com/?api-key=52c52f4f-d495-4210-a339-3d0dc3dd4c9f";

      const connection = new solanaWeb3.Connection(RPC_ENDPOINT, {
        wsEndpoint: RPC_WEBSOCKET_ENDPOINT,
        commitment: "confirmed",
      });
      const sender = wallet.publicKey as solanaWeb3.PublicKey;
      const receiver = new solanaWeb3.PublicKey(cfWallet[0]["address"]);
      const tokenMint = new solanaWeb3.PublicKey(Trantokenaddress);

      const getAddressOrCreateAssociatedTokenAccountInstruction = async (
        mintAddress: PublicKey,
        recipient: PublicKey
      ): Promise<[PublicKey, TransactionInstruction | null]> => {
        const associatedAddress = getAssociatedTokenAddressSync(
          mintAddress,
          recipient
        );
        try {
          const info = await connection.getAccountInfo(associatedAddress);
          if (!info) throw new TokenAccountNotFoundError();
        } catch (error: unknown) {
          if (
            error instanceof TokenAccountNotFoundError ||
            error instanceof TokenInvalidAccountOwnerError
          ) {
            return [
              associatedAddress,
              createAssociatedTokenAccountInstruction(
                sender,
                associatedAddress,
                recipient,
                mintAddress
              ),
            ];
          }
        }
        return [associatedAddress, null];
      };
      // mint onwer_
      const fromTokenAccount = await getAssociatedTokenAddress(
        tokenMint,
        sender
      );
      // 转换价格为代币单位
      const amount = Math.round(price * Math.pow(10, Trantokendecimals));

      const [toTokenAccount, createAssociatedTokenInstruction] =
        await getAddressOrCreateAssociatedTokenAccountInstruction(
          tokenMint,
          receiver
        );

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();
      const transaction = new solanaWeb3.Transaction({
        blockhash,
        lastValidBlockHeight,
        feePayer: sender,
      });

      if (createAssociatedTokenInstruction)
        transaction.add(createAssociatedTokenInstruction);

      transaction.add(
        createTransferInstruction(
          fromTokenAccount,
          toTokenAccount,
          sender,
          amount
        ),
        new solanaWeb3.TransactionInstruction({
          keys: [{ pubkey: sender, isSigner: true, isWritable: true }],
          data: Buffer.from(memo), // Memo 信息
          programId: new solanaWeb3.PublicKey(
            "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
          ),
        })
      );

      const signedTransaction = await wallet.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTransaction.serialize()
      );

      const result = await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      console.log(result, "result_");

      // const result = await wallet.signAndSendTransaction(transaction, {
      //   skipPreflight: true,
      //   preflightCommitment: 'confirmed',
      //   maxRetries: 3,
      // })

      // console.log(result, 'result_')

      // const signedTransaction = await wallet.signAndSendTransaction(transaction)
      // console.log(signedTransaction, 'signedTransaction_')

      // const signature = await wallet.sendRawTransaction(
      //   signedTransaction.serialize()
      // )

      // await connection.confirmTransaction(signature, 'confirmed')
      MessageSuccess(t("message.pay.success"));
    } catch (error) {
      MessageError(t("message.pay.fail"));
      console.error("pay error:", error);
    } finally {
    }
  };
  const buyPis = async (item: any) => {
    if (network.chainId === -1) {
      const connection = new solanaWeb3.Connection(
        "https://solana-mainnet.g.alchemy.com/v2/CfM2NHtMY1ZbMGUofg2uommsWHu223q5",
        "confirmed"
      );
      const tokenAccountAddress = new solanaWeb3.PublicKey(address);
      const mintAddress = new solanaWeb3.PublicKey(item.token);
      try {
        const balance: string =
          (await getTokenAccount(
            connection,
            tokenAccountAddress,
            mintAddress
          )) || "";
        const hasBalance = new Decimal(balance).lt(new Decimal(item.price));

        if (hasBalance) {
          MessageError(t("message.insufficientBalance"));
          return;
        }
        await createOrder(item.Id, item.token, item.decimals, "sol");
        console.log(balance, "balance_");
      } catch (error) {
        console.log(error, "error_");
      }
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(item.token, erc20ABI, signer);
      const balance = await contract.balanceOf(address);
      const hasBalance = new Decimal(balance.toString()).lt(
        new Decimal(item.price)
      );
      if (hasBalance) {
        MessageError(t("message.insufficientBalance"));
        return;
      }
      await createOrder(item.Id, item.token, item.decimals, "erc20", contract);
    }
  };
  const init = async (type?: string) => {
    const parmas = getUrlParams(location.search) || null;
    const code = parmas ? parmas.v : "";
    const user = await findInfoAPI({ code });
    dispatch(updatepidUserInfo(user));
    if (!type) return;
    const web3 = new Web3(window.ethereum);
    let address = "";
    if (type === "solana") {
      const wallet = window.solana;
      address = wallet && wallet.publicKey ? wallet.publicKey.toString() : "";
    } else {
      const accounts = await web3.eth.getAccounts();
      address = accounts.length ? accounts[0] : "";
    }
    localStorage.setItem("address", address);
    // 更新钱包地址
    dispatch(updateAddress(address));
  };

  return (
    <Fragment>
      <Buy
        open={buyModal}
        onHide={(bool: any) => {
          setBuyModal(bool);
        }}
        buyPis={async (item) => {
          await buyPis(item);
        }}
        buyItem={buyItem}
      ></Buy>

      <Wallet
        setLoaderWalletStatus={setLoaderWalletStatus}
        open={walletStatus}
        setWalletOpen={(e) => setWalletStatus(e)}
        getUrl={() => ""}
      />
      <GetBindCode
        open={bnidCodeStatus}
        onHide={() => setBnidCodeStatus(false)}
        url={miniProgramUrl}
      />
      <div className="grid grid-cols-12">
        <div className="z-[1] col-span-12 grid items-center grid-cols-1 gap-[36px] xl:gap-[50px]">
          <div className="grid h-fit gap-[16px] lg:gap-[26px]">
            <div className="col-span-12 grid gap-[6px] justify-items-start !text-left">
              <span className="text-[32px] font-[700] flex items-center gap-3">
                <Icon name="telegram" className="w-9 h-9" />@
                {pidUserInfo && pidUserInfo.user_id && pidUserInfo.user_name}
              </span>
              <span className="text-[#718096] text-[20px]">
                {pidUserInfo &&
                  pidUserInfo.user_id &&
                  "Telegram ID :" + pidUserInfo.user_id}
              </span>
              <div className="grid items-center gap-[8px] sm:flex w-full">
                {/* {!Object.keys(piUser).length && urlParmas.v && (
                 
                )} */}
                <div className="flex items-center gap-[8px] sm:items-baseline">
                  <Dropdowns
                    menu={
                      <>
                        {chains.map((item, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={async () => {
                              let address = "";
                              const web3 = new Web3(window.ethereum);
                              if (item.value === "solana") {
                                const wallet = window.solana;
                                address =
                                  wallet && wallet.publicKey
                                    ? wallet.publicKey.toString()
                                    : "";
                              } else {
                                const accounts = await web3.eth.getAccounts();
                                address = accounts.length ? accounts[0] : "";
                              }

                              // 存储钱包地址
                              localStorage.setItem("address", address);
                              // 更新钱包地址
                              dispatch(updateAddress(address));
                              dispatch(updateWalletStatus(true));
                              // 更新网络ID
                              setNetwork(item);
                              dispatch(updatepageNetworkId(item.chainId));
                              // 切换网络
                              dispatch(switchNetwork(item.chainId)).then(() => {
                                setChainValues(item.value);
                              });
                              await getPayList(
                                item.value === "solana" ? "sol" : item.value
                              );
                            }}
                          >
                            <div className="flex items-center gap-[8px]">
                              <div className="">
                                <Icon
                                  name={`chain/${
                                    chains.find(
                                      (items) => items.value === item.value
                                    )?.value
                                  }`}
                                  className="w-[16px] h-[16px]"
                                />
                              </div>

                              {item.name}
                            </div>
                          </Dropdown.Item>
                        ))}
                      </>
                    }
                  >
                    <div className="w-[3rem] h-[3rem] bg-[url('/image/chan.png')]  bg-no-repeat bg-full flex items-center justify-center">
                      <Icon
                        name={network ? `chain/${network.value}` : ""}
                        className="w-[20px] h-[20px]"
                      />
                    </div>
                  </Dropdowns>
                  <div className="col-span-12 flex gap-[8px] items-center mb-[-8px] sm:mb-[0] flex-wrap">
                    {address && <Box>{ellipsisMiddle(address, 6, 6)}</Box>}
                    {address ? (
                      <div
                        className="w-[3rem] h-[3rem] bg-[#0a284e] border-1 border-[#266395] rounded flex items-center justify-center"
                        onClick={() => dispatch(disconnect())}
                      >
                        <Icon name="out" className="w-[20px] h-[20px]" />
                      </div>
                    ) : (
                      <ButtonB
                        loading={loaderWalletStatus}
                        className="uppercase max-w-[160px]"
                        onClick={() => {
                          setWalletStatus(true);
                        }}
                      >
                        {t("public.connect")}
                      </ButtonB>
                    )}
                  </div>
                </div>
                <a
                  target="_blank"
                  href={telegramBotUrl}
                  className="max-w-full sm:max-w-[200px]"
                >
                  <ButtonB className="max-w-[160px]">
                    <Icon name="logos" className="w-[20px] h-[20px]" />
                    {t("public.telegramBot")}
                  </ButtonB>
                </a>
              </div>
            </div>
          </div>
        </div>
        {Config.status && (
          <div className="z-[1] col-span-12 grid mt-[48px] gap-[16px]">
            <div className="col-span-12">
              <HeaderTitle>{t("public.donate")}</HeaderTitle>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-[16px]">
              {payList.map((item: any) => (
                <div
                  className="col-span-6 md:col-span-4 lg:col-span-3"
                  onClick={() => {
                    setBuyItem(item);
                    setBuyModal(true);
                  }}
                >
                  <PisSvg
                    name={item.tokenname}
                    buyStatus="min"
                    status="popular"
                    quantity={item.amount}
                    price={item.price}
                  />
                </div>
              ))}
              {/* <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <PisSvg
                  buyStatus="max"
                  status="best"
                  quantity={3000}
                  price={6.99}
                />
              </div>
              <div className="col-span-6 md:col-span-4 lg:col-span-3">
                <PisSvg buyStatus="max-full" quantity={5000} price={9.99} />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
