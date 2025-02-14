import React from 'react'

type selectTagProps = {
  label?: string 
  options: { value: string; label: string }[]
  placeholder?: string
  value?: string 
  onChange?: (value: string) => void 
}

const SelectTag: React.FC<selectTagProps> = ({
  label = '',
  options = [],
  placeholder = 'Select Area',
  value = '',
  onChange,
}) => {
  return (
    <div className="mb-[12px]">
      <label htmlFor="post-description" className="mb-[8px] font-[400] text-[14px] text-[#48484A]">
        {label}
      </label>
      <div className="max-h-[120px] w-full border rounded-[4px] bg-white">
        <select
          id="post-description"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full py-[8px] px-[12px] outline-none font-[400] text-[12px] text-[#8E8E93]"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectTag
