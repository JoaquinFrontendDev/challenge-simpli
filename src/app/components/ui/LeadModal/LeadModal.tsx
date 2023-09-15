import { Formik, type FormikHelpers } from 'formik'
import styles from './LeadModal.module.css'
import { validationSchema } from './validations/LeadModalValidationSchema'
import LeadService from '@/services/LeadService'
import { type Lead } from '@/types/Lead'
import { useRouter } from 'next/navigation'
import { ApiError } from '@/errors/ApiError'
import { useState } from 'react'
import { XCircle } from 'lucide-react'
import Input from '../../shared/Input/Input'

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2 className={styles.formTitle}>¿Interested on this product?</h2>
          <p className={styles.formDescription}>
            Please fill out the form below to receive offers and benefits on the
            purchase of this product.
          </p>
          <div className={styles.inputRow}>
            <Input name="name" placeholder="Name" onChange={handleChange} />

            <Input
              name="lastName"
              placeholder="Apellido"
              onChange={handleChange}
            />
          </div>

          <Input
            name="email"
            placeholder="Correo Electrónico"
            onChange={handleChange}
          />

          <Input
            name="phone"
            type="number"
            placeholder="Teléfono"
            onChange={handleChange}
          />
          {isErrorBannerShowing && (
            <div className={styles.repeatedEmailBanner}>
              <XCircle
                color="#C62729"
                className={styles.closeButton}
                onClick={() => {
                  setIsErrorBannerShowing(false)
                }}
              />
              <span>
                Th is email is already registered. Please try with a different
                one
              </span>
            </div>
          )}
          <button className={styles.formCta}>Submit</button>
        </form>
      )}
    </Formik>
  )
}
