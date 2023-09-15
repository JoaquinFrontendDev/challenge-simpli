'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import styles from './Dropdown.module.css'

interface DropdownProps {
  label: string
  children: React.ReactNode
}

const Dropdown = ({ label, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.labelButton}
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {label}
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
      {isOpen && <div className={styles.contentContainer}>{children}</div>}
    </div>
  )
}

export default Dropdown
