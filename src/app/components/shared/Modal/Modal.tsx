import React, { type ReactNode } from 'react'
import styles from './Modal.module.css'
import { XCircle } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children}
        <button onClick={onClose} className={styles.closeButton}>
          <XCircle />
        </button>
      </div>
    </div>
  )
}

export default Modal
