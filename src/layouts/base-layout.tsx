"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import HeaderMobile from "./header-mobile";
import MobileNav from "./mobile-nav";
import HeaderDesktop from "./header-desktop";
// import { Breadcrumbs } from "./breadcrumbs";
import Footer from "./footer";
import "./base-layout.css";

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
    <div className="base-layout">
      <header className="layout-header-mobile-container">
        <HeaderMobile onMenuClick={toggleMobileNav} />
      </header>

      <div className={`layout-mobile-nav-container ${isMobileNavOpen ? "layout-mobile-nav-open" : ""}`}>
        <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} />
      </div>

      <header className="layout-header-desktop-container">
        <HeaderDesktop />
      </header>

      {/* If the currentPath === "/", then show the .layout-homepage-container */}
      {currentPath === "/" ? (
        <div className="layout-homepage-container">
          {children}
        </div>
      ) : null}

      {/* Else show the .layout-main-content-container */}
      {currentPath !== "/" ? (
        <div className="layout-main-content-container">
          {/* <Breadcrumbs /> */}
          {children}
        </div>
      ) : null}

      <footer className="layout-footer-container">
        <Footer />
      </footer>
    </div>
  );
}
