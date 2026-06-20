import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/logo-and-name-horizontal-black-191919.svg";
import { mainNav, companyInfoNav } from "@/navigation";
import styles from "./footer.module.css";

export default function Footer() {
  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <div className={styles["footer-container"]}>
      <hr className={styles["footer-top-divider"]} />
      <footer className={styles["footer-top"]}>
        <nav className={styles["footer-nav"]}>
          {mainNav().map((category) => (
            <ul className={styles["column"]} key={category.text}>
              <li>
                <h5 className={styles["column-header"]}>{category.text}</h5>
              </li>
              {category.subnav?.map((productType) => (
                <li key={productType.text}>
                  <Link
                    href={productType.path || "#"}
                    className={styles["item-link"]}
                  >
                    {productType.text}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
          {/* COMPANY INFO COLUMN */}
          <ul className={styles["column"]}>
            <li>
              <h5 className={styles["column-header"]}>COMPANY INFO</h5>
            </li>
            {companyInfoNav().map((companyInfo) => (
              <li key={companyInfo.text}>
                <Link
                  href={companyInfo.path || "#"}
                  className={styles["item-link"]}
                >
                  {companyInfo.text}
                </Link>
              </li>
            ))}
          </ul>
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
