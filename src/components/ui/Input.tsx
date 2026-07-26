import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          id={id}
          className={`input ${error ? 'input-error' : ''} ${className}`}
          {...props}
        />
        {error && <span className="input-error-msg">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
