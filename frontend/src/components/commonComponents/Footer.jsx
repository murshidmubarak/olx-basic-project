import './Footer.css';
import { footerLinks, categories } from '../../constants/footerData';

export default function Footer() {
  return (
    <footer className="footer">

      {/* Top Section */}
      <div className="footer-top">

        {Object.entries(footerLinks).map(([title, items]) => (
          <div className="footer-column" key={title}>

            <h3>{title}</h3>

            <ul>
              {items.map((item) => (
                <li key={item}>
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>

      {/* Categories */}
      <div className="footer-categories">

        <h3>POPULAR CATEGORIES</h3>

        <div className="categories-list">
          {categories.map((item) => (
            <a href="/" key={item}>
              {item}
            </a>
          ))}
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">

        <div className="footer-left">
          <img src="/olx_logo_2025.svg" alt="OLX" />
          <p>© 2026 OLX Clone. All rights reserved.</p>
        </div>

        <div className="footer-right">
          <a href="/">Help</a>
          <a href="/">Sitemap</a>
          <a href="/">Privacy</a>
        </div>

      </div>

    </footer>
  );
}