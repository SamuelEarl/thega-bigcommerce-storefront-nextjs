import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/logo-and-name-horizontal-black-191919.svg";
import { topNav, companyInfoNav } from "@/navigation";
import styles from "./footer.module.css";

export default function Footer() {
  const combinedNav = [...topNav(), ...companyInfoNav()];

  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <div className={styles["footer-container"]}>
      <hr className={styles["footer-top-divider"]} />
      <footer className={styles["footer-top"]}>
        <nav className={styles["footer-nav"]}>
          {combinedNav.map((column) => (
            <ul className={styles["column"]} key={column.text}>
              <li>
                <h5 className={styles["column-header"]}>{column.text}</h5>
              </li>
              {column.subnav?.map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.path || "#"}
                    className={styles["item-link"]}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </footer>

      <hr className={styles["footer-divider"]} />

      <footer className={styles["footer-bottom"]}>
        <div className={styles["logo-container"]}>
          <Link href="/">
            <Image
              src={Logo}
              alt="THEGA logo"
              className={styles["logo"]}
              height={35}
            />
          </Link>
        </div>
        <div className={styles["copyright-container"]}>
          {`© ${currentYear} THEGA. All rights reserved.`}
        </div>
      </footer>
    </div>
  )
}
