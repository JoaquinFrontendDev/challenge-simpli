import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import styles from './Footer.module.css'
import Link from 'next/link'

function Footer() {
  const allListItems = [
    [
      { name: 'Bykes' },
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' },
    ],
    [
      { name: 'Accesories' },
      { name: 'Equipaje' },
      { name: 'Carrocería' },
      { name: 'Asientos' },
      { name: 'Protección' },
      { name: 'Controles' },
    ],
    [
      { name: 'Apparel' },
      { name: 'Lifestyle accesory' },
      { name: 'Merchandising' },
      { name: 'Ridding essentials' },
      { name: 'Lifestyle apparel' },
      { name: 'Ridding jackets' },
    ],
    [
      { name: 'Contact us' },
      { name: 'Terms & Conditions' },
      { name: 'Privacy policy' },
      { name: 'Sitemap' },
    ],
  ]
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.topSection}>
          <div className={styles.leftText}>
            <p>SimpliMuv</p>
          </div>

          <div className={styles.middleLists}>
            <ul className={styles.listWrapper}>
              {allListItems[0].map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href="/">{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listWrapper}>
              {allListItems[1].map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href="/">{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listWrapper}>
              {allListItems[2].map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href="/">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.rightSocials}>
            <Facebook />
            <Twitter />
            <Instagram />
            <Youtube />
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottomSection}>
          <ul className={styles.horizontalLinks}>
            {allListItems[3].map((item, index) => (
              <li key={index} className={styles.listItem}>
                <Link href="/">{item.name}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.companyEmail}>© 2022 SimpliMuv</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
