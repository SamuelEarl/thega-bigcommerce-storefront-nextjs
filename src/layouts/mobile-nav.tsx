import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  RiCloseLargeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSearchLine,
  RiShoppingBagLine,
  RiUserLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import { iconNav, NavItem, topNav } from "@/navigation";
import Logo from "@/../public/images/logo-and-name-horizontal-white-fbfbfb.svg"
import "./mobile-nav.css";


// Icon mapping
const iconMap: Record<string, RemixiconComponentType> = {
  "search-line": RiSearchLine,
  "shopping-bag-line": RiShoppingBagLine,
  "user-line": RiUserLine,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Tracks which Level 1 menu is active (e.g. "MEN", "WOMEN"). null = top level.
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // Tracks which Level 2 submenu is active (e.g. "Shoes", "Clothing"). null = Level 2.
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Reset everything and close.
  const closeAll = () => {
    setActiveSubmenu(null);
    setActiveMenu(null);
    onClose();
  };

  return (
    <nav className="mobile-menu-container">
      <div className="mobile-menu-header">
        <button
          className="mobile-menu-header-btn"
          onClick={() => closeAll()}
        >
          <RiCloseLargeLine size={30} />
        </button>

        <div className="logo-container">
          <Link
            href={"/"}
            onClick={() => closeAll()}
          >
            <Image
              src={Logo}
              height={35}
              className="logo"
              alt="THEGA Logo"
              loading="eager"
            />
          </Link>
        </div>

        <button
          className="mobile-menu-header-btn-transparent"
          disabled
        >
          <RiCloseLargeLine size={30} />
        </button>
      </div>

      <div className="mobile-menu-icons-container">
        {iconNav().map((item, index) => {
          const IconComponent = item.icon ? iconMap[item.icon] : null;

          return (
            <button
              key={item.text}
              aria-label={item.text}
              className="mobile-menu-header-btn icon-button"
              onClick={() => {
                console.log("Clicked icon button");
              }}
            >
              {IconComponent && <IconComponent size={24} />}
            </button>
          );
        })}
      </div>

      {/* Menu container (sliding menu with 3 panels) */}
      {/* activeMenu and activeSubmenu are both null = Level 1 (Default). */}
      {/* activeMenu is truthy = Level 2. */}
      {/* activeSubmenu is truthy = Level 3. */}
      <div className={`nav-container ${activeMenu ? "slide-level2" : ""} ${activeSubmenu ? "slide-level3" : ""} `}>

        {/* Level 1 Panel: Top-level navigation (e.g. Men, Women, Kids) */}
        <div className="nav-panel">
          <ul className="navigation-list">
            {topNav().map((item: NavItem, index: number) => (
              <li key={index} className="nav-item">
                {/* If item has subnav, set activeMenu to equal item.text. */}
                {item.subnav ? (
                  <button
                    className="nav-trigger"
                    onClick={() => setActiveMenu(item.text)}
                  >
                    {item.text}
                    <RiArrowRightSLine size={30} color="var(--old-gold)" />
                  </button>
                ) : (
                  // Else display a Link to a page for items with no subnav.
                  <Link
                    href={item.path || "#"}
                    onClick={() => closeAll()}
                  >
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Level 2 Panel: Sub-navigation (e.g. Shoes, Clothing, Accessories) */}
        <div className="nav-panel">
          {activeMenu ? (
            <>
              <div className="back-btn-container">
                <button
                  className="back-btn"
                  onClick={() => setActiveMenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeMenu}
                </button>
              </div>

              <ul className="subnav-list">
                {/* Find the activeMenu in topNav() and map over its subnav. */}
                {topNav().find((item) => item.text === activeMenu)?.subnav?.map((subnavItem: NavItem, index: number) => (
                  <li key={index} className="nav-item">
                    {/* If item has subnav, set activeMenu to equal item.text. */}
                    {subnavItem.subnav ? (
                      // Set the activeSubmenu to equal subnavItem.text, which will trigger the slide to Level 3.
                      <button
                        className="nav-trigger"
                        onClick={() => setActiveSubmenu(subnavItem.text)}
                      >
                        {subnavItem.text}
                        <RiArrowRightSLine size={30} color="var(--old-gold)" />
                      </button>
                    ) : (
                      // Else display a Link to a page for items with no subnav.
                      <Link
                        href={subnavItem.path || "#"}
                        onClick={() => closeAll()}
                      >
                        {subnavItem.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Level 3 Panel: Leaf-level links (e.g. All Men's Shoes, Running, Soccer) */}
        <div className="nav-panel">
          {activeSubmenu ? (
            <>
              <div className="back-btn-container">
                <button
                  className="back-btn"
                  onClick={() => setActiveSubmenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeSubmenu}
                </button>
              </div>

              <ul className="subnav-list">
                {/* Find the activeMenu, then find activeSubmenu within it, then map over its subnav. */}
                {topNav()
                  .find((item) => item.text === activeMenu)
                  ?.subnav?.find((subItem) => subItem.text === activeSubmenu)
                  ?.subnav?.map((leafItem: NavItem, index: number) => (
                    <li key={index} className="nav-item">
                      <Link
                        href={leafItem.path || "#"}
                        onClick={() => closeAll()}
                      >
                        {leafItem.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
