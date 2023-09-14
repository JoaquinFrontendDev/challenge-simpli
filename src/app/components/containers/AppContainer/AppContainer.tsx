import { type ReactNode } from 'react'
import styles from './container.module.css'

interface AppContainerProps {
  children: ReactNode
}

function AppContainer({ children }: AppContainerProps) {
  return <div className={styles.container}>{children}</div>
}

export default AppContainer
