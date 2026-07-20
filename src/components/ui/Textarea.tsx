import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export default function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  return (
    <div className="textarea-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className={`textarea ${error ? 'textarea-error' : ''} ${className}`}
        {...props}
      />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  )
}
