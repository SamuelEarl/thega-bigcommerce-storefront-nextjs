import Link from "next/link";
import { NavItem, topNav } from "@/navigation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["hero-image-container"]}>
      <div className={styles["hero-content-container"]}>
        <div className={styles["hero-content"]}>
          <h1>THE GAME IS LIFE</h1>
          <p className={styles["clear-tagline-styles"]}>For those who live and breathe sports and fitness—</p>
          <p className={styles["clear-tagline-styles"]}>
            <span className={styles["tagline"]}>THE GAME IS LIFE</span>,
          </p>
          <p className={styles["clear-tagline-styles"]}>and our gear powers every step forward.</p>
          <br />
          <div className={styles["cta-container"]}>
            {topNav().map((item: NavItem) => (
              <Link key={item.text} href={item.path || "#"} className={styles["cta"]}>
                SHOP {item.text.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
