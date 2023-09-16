import React from 'react'
import { BadgeX } from 'lucide-react'
import styles from './NoResults.module.css'

const NoResultsText = {
  MESSAGE: 'No se encontraron resultado para la busqueda',
}

const NoResults: React.FC = () => {
  return (
    <div className={styles.container}>
      <BadgeX className={styles.icon} size={50} />
      <p className={styles.text}>{NoResultsText.MESSAGE}</p>
    </div>
  )
}

export default NoResults
