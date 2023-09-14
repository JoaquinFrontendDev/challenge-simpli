import styles from './Newsletter.module.css'

function Newsletter() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Newsletter</h2>
      <p className={styles.description}>
        Sapien, duis commodo risus molestie pulvinar sit id id.
      </p>
      <div className={styles.inputContainer}>
        <input
          type="email"
          placeholder="Ingresa tu email"
          className={styles.emailInput}
        />
        <button className={styles.ctaButton}>Call to action</button>
      </div>
    </div>
  )
}

export default Newsletter
