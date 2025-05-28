import React from 'react';

export default function InputGroup({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  margin = 3,
  editable = true
}) {
  return (
    <div className={`inputGroup mb-${margin}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="form-control form-control-md inputField"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={!editable}
        style={{ color: editable ? undefined : 'var(--cinzento-claro)' }}
      />
    </div>
  );
}