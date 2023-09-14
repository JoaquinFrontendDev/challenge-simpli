'use client'

import styles from './Stepper.module.css'

interface StepperProps {
  currentStep: number
}

const Stepper = ({ currentStep }: StepperProps) => {
  const steps = [1, 2, 3]

  return (
    <div className={styles.flexRow}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.step} ${
            index === currentStep ? styles.activeStep : ''
          }`}
        />
      ))}
    </div>
  )
}

export default Stepper
