import Link from "next/link";
import "./page.css";
import { NavItem, topNav } from "@/navigation";

export default function Home() {
  return (
    <div className="hero-image-container">
      <div className="hero-content-container">
        <div className="hero-content">
          <h1>THE GAME IS LIFE</h1>
          <p className="clear-tagline-styles">For those who live and breathe sports and fitness—</p>
          <p className="clear-tagline-styles"><span className="tagline">THE GAME IS LIFE</span>,</p>
          <p className="clear-tagline-styles">and our gear powers every step forward.</p>
          <br />
          <div className="cta-container">
            {topNav().map((item: NavItem) => (
              <Link key={item.text} href={item.path || "#"} className="cta">
                SHOP {item.text.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
