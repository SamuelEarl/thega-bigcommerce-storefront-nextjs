"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import HeaderMobile from "./header-mobile";
import MobileNav from "./mobile-nav";
import HeaderDesktop from "./header-desktop";
import Footer from "./footer";
import "./base-layout.css";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pathname = usePathname();

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

      {/* If the current route === "/", then show the .layout-homepage-container */}
      {pathname === "/" ? (
        <div className="layout-homepage-container">
          {children}
        </div>
      ) : null}

      {/* Else show the .layout-main-content-container */}
      {pathname !== "/" ? (
        <div className="layout-main-content-container">
          {children}
        </div>
      ) : null}

      <footer className="layout-footer-container">
        <Footer />
      </footer>
    </div>
  );
}
