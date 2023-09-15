import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default async function ThankYouPage() {
  return (
    <div className={styles.thankYouPageContainer}>
      <div className={styles.thankYouPageImage}>
        <Image src="/assets/images/success.png" fill alt="success-icon" />
      </div>
      <h2 className={styles.thankYouPageText}>
        Thank you, we will be in touch!
      </h2>
      <Link href="/" className={styles.thankYouPageCta}>
        Go to home
      </Link>
    </div>
  )
}
