import React from 'react'

type InputFieldProps = {
  label?: string
  placeholder: string
  Icon?: React.ElementType
  type: string
  disabled?: boolean
  radius?: string
  fill?: string
}

export default function InputField({
  label,
  placeholder,
  Icon,
  type = 'text',
  disabled = false,
  radius,
  fill = '#8E8E93',
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor="" className="text-[#48484A] font-[400] text-[14px]">
        {label}
      </label>
      <div
        className="mt-[8px] border bg-white py-[17px] px-[13px] flex items-center gap-[8px] w-full"
        style={{ borderRadius: radius }}
      >
        {Icon && (
          <div>
            <Icon fill={fill} />
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          className="outline-none w-[90%] bg-transparent"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
