import { ErrorMessage, Formik, type FormikHelpers, useField } from 'formik'
import styles from './LeadModal.module.css'
import { validationSchema } from './validations/LeadModalValidationSchema'
import LeadService from '@/services/LeadService'
import { type Lead } from '@/types/Lead'
import { useRouter } from 'next/navigation'
import { ApiError } from '@/errors/ApiError'
import { useState } from 'react'
import { XCircle } from 'lucide-react'

interface TextInputProps {
  name: string
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
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

  const TextInput = ({ name, placeholder, onChange }: TextInputProps) => {
    const [field, ,] = useField(name)
    return (
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={field.value}
        onChange={onChange}
      />
    )
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
            <div className={styles.inputContainer}>
              <TextInput
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              <ErrorMessage
                name="name"
                className={styles.inputErrorMessage}
                component="div"
              />
            </div>
            <div className={styles.inputContainer}>
              <TextInput
                name="lastName"
                placeholder="Apellido"
                onChange={handleChange}
              />
              <ErrorMessage
                name="lastName"
                className={styles.inputErrorMessage}
                component="div"
              />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              name="email"
              placeholder="Correo Electrónico"
              onChange={handleChange}
            />
            <ErrorMessage
              name="email"
              className={styles.inputErrorMessage}
              component="div"
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              name="phone"
              placeholder="Teléfono"
              onChange={handleChange}
            />
            <ErrorMessage
              name="phone"
              className={styles.inputErrorMessage}
              component="div"
            />
          </div>
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
