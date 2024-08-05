import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router";

import SuccessNonePng from "@/assets/image/success-none.png";
import Box from "@/components/box";
import Button from "@/components/button";
import Dropdowns from "@/components/dropdown";
import { HeaderTitle } from "@/components/header";
import Icon from "@/components/icon";
import Segmentation from "@/components/segmentation";
import { ellipsisMiddle, semicolon } from "@/util";

const PisSvg = ({
  status = "",
  buyStatus = "min",
  price = 0,
  quantity = 0,
}: {
  status?: "popular" | "best" | "";
  buyStatus?: "min" | "max" | "max-full";
  price?: number;
  quantity?: number;
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
          <span className="text-[#4489C6]">USD</span>
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
  const { userid } = useParams();
  const chain: string[] = ["Solana", "ETh/BSC", "Pi Browser"];
  const [chainValue, setChainValue] = useState<string>(
    userid != undefined ? chain?.[0] : chain?.[2]
  );

  const chains = [
    { name: "BSC", value: "bsc" },
    { name: "ETH", value: "eth" },
    { name: "SOLANA", value: "solana" },
  ];

  const [chainValues, setChainValues] = useState("eth");

  return (
    <div className="grid grid-cols-12">
      <div className="z-[1] col-span-12 grid items-center grid-cols-[1fr] lg:grid-cols-[320px,1fr] xl:grid-cols-[360px,1fr] gap-[36px] xl:gap-[50px]">
        <div className="hidden lg:flex">
          <Pis />
        </div>
        <div className="grid h-fit gap-[16px] lg:gap-[26px]">
          <div className="col-span-12 grid gap-[6px]">
            <span className="text-[32px] font-[700] flex items-center gap-[16px]">
              <Icon name="telegram" className="w-[32px] h-[32px] text-[#718096]"/>
              {userid ? "@ABC001" : "--"}
            </span>
            <span className="text-[#718096] text-[20px]">
              Telegram ID : {userid ? userid : "--"}
            </span>
          </div>
          <div className="col-span-12 grid gap-[16px] h-fit">
            <div className="col-span-12 flex gap-[8px] items-center mb-[-8px] sm:mb-[0]">
              <Dropdowns
                menu={
                  <>
                    {chains.map((item, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setChainValues(item.value)}
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
                <div className="w-[40px] h-[40px] bg-[url('/image/chan.png')]  bg-no-repeat bg-full flex items-center justify-center">
                  <Icon
                    name={`chain/${
                      chains.find((item) => item.value === chainValues)?.value
                    }`}
                    className="w-[20px] h-[20px]"
                  />
                </div>
              </Dropdowns>
              <Box>{ellipsisMiddle("0x000000000000000", 4, 3)}</Box>
              <Button className="uppercase">disconnect</Button>
            </div>
            <div className="col-span-12 grid sm:flex gap-[48px] sm:gap-[16px] sm:justify-between mt-[8px] sm:mt-[0]">
              <HeaderTitle className="order-2 sm:!order-1">Bind</HeaderTitle>
              <span className="order-1 sm:!order-2 flex items-center gap-[6px] text-[#0CB1A0] text-[22px] font-[500] underline">
                <Icon name="robot" className="w-[22px] h-[22px]" /> Telegram Bot
              </span>
            </div>
            <div className="col-span-12">
              <Segmentation
                onChange={(e) => setChainValue(e)}
                value={chainValue}
                data={chain.map((itme, index) =>
                  Object.assign(
                    {},
                    {
                      name: itme,
                      value: itme,
                      disabled: userid
                        ? index === -1
                        : index === 0 || index === 1,
                    }
                  )
                )}
              />
            </div>
            <div className="col-span-12">
              <Box>
                <Icon name="wallet" className="w-[26px] h-[26px]" />
                {ellipsisMiddle("0x000000000000000", 6)}
                <img src={SuccessNonePng} className="w-[22px] h-[16px]" />
              </Box>
            </div>
          </div>
        </div>
      </div>
      <div className="z-[1] col-span-12 grid mt-[48px] gap-[16px]">
        <div className="col-span-12">
          <HeaderTitle>Donate</HeaderTitle>
        </div>
        <div className="col-span-12 grid grid-cols-12 gap-[16px]">
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <PisSvg
              buyStatus="min"
              status="popular"
              quantity={1000}
              price={2.99}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <PisSvg
              buyStatus="max"
              status="best"
              quantity={3000}
              price={6.99}
            />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <PisSvg buyStatus="max-full" quantity={5000} price={9.99} />
          </div>
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <PisSvg buyStatus="max-full" quantity={5000} price={9.99} />
          </div>
        </div>
      </div>
    </div>
  );
}
