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
  // Tracks which Audience menu is active and currently displayed (e.g. "MEN", "WOMEN"). null = Level 1, shows the audience options.
  const [activeAudienceMenu, setActiveAudienceMenu] = useState<string | null>(null);
  // Tracks which Category submenu is active (e.g. "Shoes", "Clothing"). null = Level 2, shows the category options.
  const [activeCategorySubmenu, setActiveCategorySubmenu] = useState<string | null>(null);

  // Reset everything and close.
  const closeAll = () => {
    setActiveCategorySubmenu(null);
    setActiveAudienceMenu(null);
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
      {/* If activeAudienceMenu and activeCategorySubmenu are both null = Level 1 (Default). */}
      {/* If activeAudienceMenu is truthy = Level 2. */}
      {/* If activeCategorySubmenu is truthy = Level 3. */}
      <div className={`${styles["nav-container"]} ${activeAudienceMenu ? styles["slide-level2"] : ""} ${activeCategorySubmenu ? styles["slide-level3"] : ""}`.trim()}>

        {/* Level 1 Panel: Audience navigation (e.g. Men, Women, Kids) */}
        <div className={styles["nav-panel"]}>
          <ul className={styles["navigation-list"]}>
            {Object.entries(topNav().audience).map(([audienceKey, audienceObj]) => (
              <li key={audienceKey} className={styles["nav-item"]}>
                {audienceObj.category ?
                  // If the audienceObj has a category, then display a button that can be clicked, which will then display the audience > categories. If the button is clicked, then set `activeAudienceMenu` to equal `audienceKey`.
                  (
                    <button
                      className={styles["nav-trigger"]}
                      onClick={() => setActiveAudienceMenu(audienceKey)}
                    >
                      {audienceObj.text}
                      <RiArrowRightSLine size={30} color="var(--old-gold)" />
                    </button>
                  ) :
                  // Else display a direct Link to a page for items with no subnav.
                  (
                    <Link
                      href={audienceObj.path || "#"}
                      onClick={() => closeAll()}
                    >
                      {audienceObj.text}
                    </Link>
                  )
                }
              </li>
            ))}
          </ul>
        </div>

        {/* Level 2 Panel: Category navigation (e.g. Shoes, Clothing, Accessories) and Sports navigation. */}
        <div className={styles["nav-panel"]}>
          {activeAudienceMenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveAudienceMenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeAudienceMenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeAudienceMenu in topNav() and map over its category object entries. */}
                {Object.entries(topNav().audience[activeAudienceMenu].category).map(([categoryKey, categoryObj]) => (
                  <li key={categoryKey} className={styles["nav-item"]}>
                    {/* If item has a productType, then set activeAudienceMenu to equal item.text. */}
                    {categoryObj.productType ? (
                      // Set the activeCategorySubmenu to equal categoryKey, which will trigger the slide to Level 3.
                      <button
                        className={styles["nav-trigger"]}
                        onClick={() => setActiveCategorySubmenu(categoryKey)}
                      >
                        {categoryObj.text}
                        <RiArrowRightSLine size={30} color="var(--old-gold)" />
                      </button>
                    ) : (
                      // Else display a Link to a page for items with no subnav.
                      <Link
                        href={categoryObj.path || "#"}
                        onClick={() => closeAll()}
                      >
                        {categoryObj.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Level 3 Panel: Product Type navigation (e.g. All Men's Shoes, Running, Soccer) */}
        <div className={styles["nav-panel"]}>
          {activeAudienceMenu && activeCategorySubmenu ? (
            <>
              <div className={styles["back-btn-container"]}>
                <button
                  className={styles["back-btn"]}
                  onClick={() => setActiveCategorySubmenu(null)}
                >
                  <RiArrowLeftSLine size={30} color="var(--old-gold)" />
                  {activeCategorySubmenu}
                </button>
              </div>

              <ul className={styles["subnav-list"]}>
                {/* Find the activeAudienceMenu, then find activeCategorySubmenu within it, then map over its productType object entries. */}
                {/* If `productType` is undefined, then `?? {}` defaults to an empty object and Object.entries() will return an empty array and will render nothing. */}
                {Object.entries(
                  topNav().audience[activeAudienceMenu].category[activeCategorySubmenu].productType ?? {}
                ).map(([productTypeKey, productTypeObj]) => (
                  <li key={productTypeKey} className={styles["nav-item"]}>
                    <Link
                      href={productTypeObj.path || "#"}
                      onClick={() => closeAll()}
                    >
                      {productTypeObj.text}
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
