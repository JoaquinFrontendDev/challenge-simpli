import { useField, ErrorMessage } from 'formik'
import styles from './Input.module.css'

interface InputProps {
  name: string
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel'
  placeholder: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  onChange,
}) => {
  const [field] = useField(name)

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...field}
        onChange={onChange}
      />
      <ErrorMessage
        name={name}
        className={styles.inputErrorMessage}
        component="div"
      />
    </div>
  )
}

export default Input
