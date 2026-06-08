import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/logo-and-name-horizontal-black-191919.svg";
import { topNav, companyInfoNav } from "@/navigation";
import "./footer.css";

export default function Footer() {
  const combinedNav = [...topNav(), ...companyInfoNav()];

  const now = new Date();
  const currentYear = now.getFullYear();

  return (
    <div className="footer-container">
      <hr className="footer-top-divider" />
      <footer className="footer-top">
        <nav className="footer-nav">
          {combinedNav.map((column) => (
            <ul className="column" key={column.text}>
              <li>
                <h5 className="column-header">{column.text}</h5>
              </li>
              {column.subnav?.map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.path || "#"}
                    className="item-link"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>
      </footer>

      <hr className="footer-divider" />

      <footer className="footer-bottom">
        <div className="logo-container">
          <Link href="/">
            <Image
              src={Logo}
              alt="THEGA logo"
              className="logo"
              height={35}
            />
          </Link>
        </div>
        <div className="copyright-container">
          {`© ${currentYear} THEGA. All rights reserved.`}
        </div>
      </footer>
    </div>
  )
}
