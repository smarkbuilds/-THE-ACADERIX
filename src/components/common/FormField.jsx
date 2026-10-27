import React from 'react';

/**
 * Reusable controlled form field supporting inputs, selects, and textareas.
 * Displays field-specific validation errors and accessibility labels.
 */
export function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  helpText,
  options = [],
  rows = 3,
  disabled = false,
  className = ''
}) {
  const inputId = id || name;
  const isInvalid = Boolean(error);

  return (
    <div className={`form-field-group ${isInvalid ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span className="required-star" aria-hidden="true">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={`form-control form-select ${isInvalid ? 'input-error' : ''}`}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          required={required}
          className={`form-control form-textarea ${isInvalid ? 'input-error' : ''}`}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        />
      ) : (
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`form-control form-input ${isInvalid ? 'input-error' : ''}`}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
        />
      )}

      {error ? (
        <p id={`${inputId}-error`} className="field-error-message" role="alert">
          <span className="error-icon" aria-hidden="true">⚠️</span> {error}
        </p>
      ) : helpText ? (
        <p id={`${inputId}-help`} className="field-help-text">
          {helpText}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
