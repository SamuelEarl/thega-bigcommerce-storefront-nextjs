import Link from "next/link";
import Image from "next/image";
import { RiMenuLine } from "@remixicon/react";
import Logo from "@/../public/images/logo-and-name-horizontal-white-fbfbfb.svg"
import "./header-mobile.css";

interface HeaderMobileProps {
  onMenuClick: () => void;
}

export default function HeaderMobile({ onMenuClick }: HeaderMobileProps) {
  return (
    <div className="header-mobile-content">
      <div className="menu-btn-container">
        <button onClick={onMenuClick}>
          <RiMenuLine size={30} />
        </button>
      </div>
      <div className="logo-container">
        <Link href="/">
          <Image
            src={Logo}
            height={35}
            className="logo"
            alt="THEGA logo"
            loading="eager"
          />
        </Link>
      </div>
      <div className="transparent-btn-container">
        <button className="transparent-btn" disabled>
          <RiMenuLine size={30} />
        </button>
      </div>
    </div>
  )
}
