import styles from './Newsletter.module.css'

enum NewsletterTexts {
  TITLE = 'Newsletter',
  DESCRIPTION = 'Join our newsletter and stay updated with the latest news.',
  EMAIL_PLACEHOLDER = 'Enter your email',
  CTA_BUTTON = 'Subscribe',
}

function Newsletter() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{NewsletterTexts.TITLE}</h2>
      <p className={styles.description}>{NewsletterTexts.DESCRIPTION}</p>
      <div className={styles.inputContainer}>
        <input
          type="email"
          placeholder={NewsletterTexts.EMAIL_PLACEHOLDER}
          className={styles.emailInput}
        />
        <button className={styles.ctaButton}>
          {NewsletterTexts.CTA_BUTTON}
        </button>
      </div>
    </div>
  )
}

export default Newsletter
