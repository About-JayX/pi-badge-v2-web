import "./header.scss";

import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Button from "@/components/button";
import Icon from "@/components/icon";
import locale from "@/config/locale";

import Dropdowns from "../dropdown";

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
  const { i18n } = useTranslation();
  return (
    <div className="header-end">
      <Dropdowns
        menu={
          <>
            {Object.entries(locale).map(([key, value]: any) => (
              <Dropdown.Item key={key} onClick={() => i18n.changeLanguage(key)}>
                {value.translation.language}
              </Dropdown.Item>
            ))}
          </>
        }
      >
        <Button type="default">
          <Icon name="lang" />
          {Object.entries(locale).map(
            ([key, value]: any) =>
              key === i18n.language && value.translation.lang
          )}
        </Button>
      </Dropdowns>
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
  return (
    <div className={`header-title uppercase ${className}`}>{children}</div>
  );
};

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-box">
          <a className="flex gap-[16px] items-center">
            <img className="w-[44px] h-[44px]" src="/logos.svg" />
            <span className="hidden sm:flex text-[28px] font-[400] font-[EDIX]">
              PIWAR
            </span>
          </a>
          <Nav />
          <HeaderEnd />
        </div>
      </div>
    </header>
  );
}
