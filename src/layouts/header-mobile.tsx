import Link from "next/link";
import Image from "next/image";
import { RiMenuLine } from "@remixicon/react";
import Logo from "@/../public/images/logo-and-name-horizontal-white-fbfbfb.svg"
import styles from "./header-mobile.module.css";

interface HeaderMobileProps {
  onMenuClick: () => void;
}

export default function HeaderMobile({ onMenuClick }: HeaderMobileProps) {
  return (
    <div className={styles["header-mobile-content"]}>
      <div className={styles["menu-btn-container"]}>
        <button onClick={onMenuClick}>
          <RiMenuLine size={30} />
        </button>
      </div>
      <div className={styles["logo-container"]}>
        <Link href="/">
          <Image
            src={Logo}
            height={35}
            className={styles["logo"]}
            alt="THEGA logo"
            loading="eager"
          />
        </Link>
      </div>
      <div className={styles["transparent-btn-container"]}>
        <button className={styles["transparent-btn"]} disabled>
          <RiMenuLine size={30} />
        </button>
      </div>
    </div>
  )
}
