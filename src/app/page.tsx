import Link from "next/link";
import { NavItem, topNav } from "@/navigation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["hero-image-container"]}>
      <div className={styles["hero-content-container"]}>
        <div className={styles["hero-content"]}>
          <div className={styles["tagline-container"]}>
            <h1 className={styles["hero-title"]}>THE GAME IS LIFE</h1>
            <p className={styles["paragraph-styles"]}>For those who live and breathe sports and fitness—</p>
            <p className={styles["paragraph-styles"]}>
              <span className={styles["tagline"]}>THE GAME IS LIFE</span>,
            </p>
            <p className={styles["paragraph-styles"]}>and our gear powers every step forward.</p>
          </div>
          <div className={styles["cta-container"]}>
            {Object.entries(topNav().audience).map(([audienceKey, audienceValue]) => (
              <Link key={audienceKey} href={audienceValue.path || "#"} className={styles["cta"]}>
                SHOP {audienceValue.text.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
