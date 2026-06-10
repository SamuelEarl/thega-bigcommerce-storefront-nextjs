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
import styles from "./mobile-nav.module.css"


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
    <nav className={styles["mobile-menu-container"]}>
      <div className={styles["mobile-menu-header"]}>
        <button
          className={styles["mobile-menu-header-btn"]}
          onClick={() => closeAll()}
        >
          <RiCloseLargeLine size={30} />
        </button>

        <div className={styles["logo-container"]}>
          <Link
            href={"/"}
            onClick={() => closeAll()}
          >
            <Image
              src={Logo}
              height={35}
              className={styles["logo"]}
              alt="THEGA Logo"
              loading="eager"
            />
          </Link>
        </div>

        <button
          className={styles["mobile-menu-header-btn-transparent"]}
          disabled
        >
          <RiCloseLargeLine size={30} />
        </button>
      </div>

      <div className={styles["mobile-menu-icons-container"]}>
        {iconNav().map((item, index) => {
          const IconComponent = item.icon ? iconMap[item.icon] : null;

          return (
            <button
              key={item.text}
              aria-label={item.text}
              className={`${styles["mobile-menu-header-btn"]} ${styles["icon-button"]}`}
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
      {/* If activeMenu and activeSubmenu are both null = Level 1 (Default). */}
      {/* If activeMenu is truthy = Level 2. */}
      {/* If activeSubmenu is truthy = Level 3. */}
      <div className={`${styles["nav-container"]} ${activeMenu ? styles["slide-level2"] : ""} ${activeSubmenu ? styles["slide-level3"] : ""}`.trim()}>

        {/* Level 1 Panel: Top-level navigation (e.g. Men, Women, Kids) */}
        <div className={styles["nav-panel"]}>
          <ul className={styles["navigation-list"]}>
            {topNav().map((item: NavItem, index: number) => (
              <li key={index} className={styles["nav-item"]}>
                {/* If item has subnav, set activeMenu to equal item.text. */}
                {item.subnav ? (
                  <button
                    className={styles["nav-trigger"]}
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
        <div className={styles["nav-panel"]}>
          {activeMenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveMenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeMenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeMenu in topNav() and map over its subnav. */}
                {topNav().find((item) => item.text === activeMenu)?.subnav?.map((subnavItem: NavItem, index: number) => (
                  <li key={index} className={styles["nav-item"]}>
                    {/* If item has subnav, set activeMenu to equal item.text. */}
                    {subnavItem.subnav ? (
                      // Set the activeSubmenu to equal subnavItem.text, which will trigger the slide to Level 3.
                      <button
                        className={styles["nav-trigger"]}
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
        <div className={styles["nav-panel"]}>
          {activeSubmenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveSubmenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeSubmenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeMenu, then find activeSubmenu within it, then map over its subnav. */}
                {topNav()
                  .find((item) => item.text === activeMenu)
                  ?.subnav?.find((subItem) => subItem.text === activeSubmenu)
                  ?.subnav?.map((leafItem: NavItem, index: number) => (
                    <li key={index} className={styles["nav-item"]}>
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
