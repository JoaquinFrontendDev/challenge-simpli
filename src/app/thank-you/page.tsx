import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

enum ThankYouPageTexts {
  TITLE = 'Thank you, we will be in touch!',
  CTA = 'Go to home',
}

export default function ThankYouPage() {
  return (
    <div className={styles.thankYouPageContainer}>
      <div className={styles.thankYouPageImage}>
        <Image
          src="/assets/images/success.png"
          layout="fill"
          alt="success-icon"
        />
      </div>
      <h2 className={styles.thankYouPageText}>{ThankYouPageTexts.TITLE}</h2>
      <Link href="/">
        <a className={styles.thankYouPageCta}>{ThankYouPageTexts.CTA}</a>
      </Link>
    </div>
  )
}
