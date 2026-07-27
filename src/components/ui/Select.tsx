import { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
}

export default function Select({ label, options, error, id, className = '', ...props }: SelectProps) {
  return (
    <div className="select-wrapper">
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} className={`select ${error ? 'select-error' : ''} ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  )
}
