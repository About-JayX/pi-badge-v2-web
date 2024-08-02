import "./header.scss";

import Button from "@/components/button";
import Icon from "@/components/icon";

export const Nav = () => {
  return (
    <div className="nav !hidden lg:!flex">
      <a>Home</a>
      <a>Home</a>
      <a>Home</a>
    </div>
  );
};

export const HeaderEnd = () => {
  return (
    <div className="header-end">
      <Button className="!hidden md:!flex">
        <Icon name="wallet" />
        CONNECT
      </Button>
      <Button>
        <Icon name="lang/en" />
        English
        <Icon name="refresh" />
      </Button>
    </div>
  );
};

export const HeaderTitle = ({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return <div className={`header-title uppercase ${className}`}>{children}</div>;
};

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-box">
          <a className="flex gap-[8px] items-center">
            <img className="w-[50px] h-[50px]" />
            <span className="hidden sm:flex text-[28px] font-[400] font-[EDIX]">PIWAR</span>
          </a>
          <Nav />
          <HeaderEnd />
        </div>
      </div>
    </header>
  );
}
