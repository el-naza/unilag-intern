import React from 'react'

type TextAreaProps = {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const TextArea: React.FC<TextAreaProps> = ({
  label = '',
  placeholder = '',
  value = '',
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="" className="mb-[8px] font-[400] text-[14px] text-[#48484A]">
        {label}
      </label>
      <div className="h-[120px] w-full border rounded-[4px] bg-white">
        <textarea
          id=""
          className="w-full h-[120px] py-[8px] px-[12px] outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default TextArea
