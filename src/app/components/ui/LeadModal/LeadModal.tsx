import { Formik, type FormikHelpers } from 'formik'
import styles from './LeadModal.module.css'
import { validationSchema } from './validations/LeadModalValidationSchema'
import LeadService from '@/services/LeadService'
import { type Lead } from '@/types/Lead'
import { useRouter } from 'next/navigation'
import { ApiError } from '@/errors/ApiError'
import { useState, useCallback } from 'react'
import { XCircle } from 'lucide-react'
import Input from '../../shared/Input/Input'

enum FormTexts {
  TITLE = 'Interested in this product?',
  DESCRIPTION = 'Please fill out the form below to receive offers and benefits on the purchase of this product.',
  ERROR_MESSAGE = 'The email is already registered. Please try with a different one',
}

enum InputPlaceholders {
  NAME = 'First Name',
  LAST_NAME = 'Last Name',
  EMAIL = 'Email',
  PHONE = 'Phone',
}

interface LeadFormProps {
  productID: string
}

export default function LeadForm({ productID }: LeadFormProps) {
  const router = useRouter()
  const [isErrorBannerShowing, setIsErrorBannerShowing] = useState(false)

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    productID,
  }

  const onSubmit = async (values: Lead, helpers: FormikHelpers<Lead>) => {
    try {
      await LeadService.createLead(values)
      helpers.resetForm()
      router.push('/thank-you')
    } catch (error) {
      setIsErrorBannerShowing(true)
      throw new ApiError(400, 'Bad Request')
    }
  }

  const handleCloseBanner = useCallback(() => {
    setIsErrorBannerShowing(false)
  }, [])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.formTitle}>{FormTexts.TITLE}</h2>
          <p className={styles.formDescription}>{FormTexts.DESCRIPTION}</p>
          <div className={styles.inputRow}>
            <Input
              name="name"
              placeholder={InputPlaceholders.NAME}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              placeholder={InputPlaceholders.LAST_NAME}
              onChange={handleChange}
            />
          </div>

          <Input
            name="email"
            placeholder={InputPlaceholders.EMAIL}
            onChange={handleChange}
          />
          <Input
            name="phone"
            type="number"
            placeholder={InputPlaceholders.PHONE}
            onChange={handleChange}
          />

          {isErrorBannerShowing && (
            <div className={styles.repeatedEmailBanner}>
              <XCircle
                color="#C62729"
                className={styles.closeButton}
                onClick={handleCloseBanner}
              />
              <span>{FormTexts.ERROR_MESSAGE}</span>
            </div>
          )}
          <button className={styles.formCta}>Submit</button>
        </form>
      )}
    </Formik>
  )
}
