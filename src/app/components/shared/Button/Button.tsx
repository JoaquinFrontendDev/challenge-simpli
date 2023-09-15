'use client'

import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  defaultButton?: boolean
  label: string
  onClick?: () => void
}

const Button = ({ defaultButton, label, onClick }: ButtonProps) => {
  const buttonClass = defaultButton
    ? styles.defaultButton
    : styles.primaryButton

  return (
    <button className={buttonClass} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
