"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import HeaderMobile from "./header-mobile";
import MobileNav from "./mobile-nav";
import HeaderDesktop from "./header-desktop";
import { Breadcrumbs } from "./breadcrumbs";
import Footer from "./footer";
import styles from "./base-layout.module.css";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const currentPath = usePathname();

  const toggleMobileNav = () => setIsMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className={styles["base-layout"]}>
      <header className={styles["layout-header-mobile-container"]}>
        <HeaderMobile onMenuClick={toggleMobileNav} />
      </header>

      <div className={`${styles["layout-mobile-nav-container"]} ${isMobileNavOpen ? styles["layout-mobile-nav-open"] : ""}`}>
        <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} />
      </div>

      {/* <header className={styles["layout-header-desktop-container"]}>
        <HeaderDesktop />
      </header> */}

      {/* If the currentPath === "/", then show the .layout-homepage-container */}
      {currentPath === "/" ? (
        <div className={styles["layout-homepage-container"]}>
          {children}
        </div>
      ) : null}

      {/* Else show the .layout-main-content-container */}
      {currentPath !== "/" ? (
        <div className={styles["layout-main-content-container"]}>
          {/* <Breadcrumbs /> */}
          {children}
        </div>
      ) : null}

      {/* <footer className={styles["layout-footer-container"]}>
        <Footer />
      </footer> */}
    </div>
  );
}
