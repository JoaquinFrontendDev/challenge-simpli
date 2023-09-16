import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import styles from './Footer.module.css'
import Link from 'next/link'
import { footerLinks } from '@/constants/footerLinks'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.topSection}>
          <div className={styles.leftText}>
            <p>SimpliMuv</p>
          </div>

          <div className={styles.middleLists}>
            <ul className={styles.listWrapper}>
              {footerLinks[0].map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href="/">{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listWrapper}>
              {footerLinks[1].map((item, index) => (
                <li key={index} className={styles.listItem}>
                  <Link href="/">{item.name}</Link>
                </li>
              ))}
            </ul>
            <ul className={styles.listWrapper}>
              {footerLinks[2].map((item, index) => (
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
            {footerLinks[3].map((item, index) => (
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
