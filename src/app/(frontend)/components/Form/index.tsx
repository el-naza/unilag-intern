import React, { useRef, useState } from 'react'
import { JSX } from 'react/jsx-runtime'

type FieldType = {
  name: string
  label?: string
  type?: 'text' | 'email' | 'password' | 'select' | 'otp' | 'file'
  value?: string
  placeholder?: string
  icon?: JSX.Element
  options?: { label: string; value: string }[]
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  error?: string
  message?: string
  otpLength?: number
}

type DynamicFormProps = {
  fields: FieldType[]
  onSubmit: () => void
  submitButtonText?: string
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  submitButtonText = 'Submit',
}) => {
  const [otpValues, setOtpValues] = useState<{ [key: string]: string[] }>({})
  const inputsRefs = useRef<{ [key: string]: HTMLInputElement[] }>({})
  const handleOTPChange = (
    value: string,
    index: number,
    otpFieldName: string,
    otpLength: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  ) => {
    if (!/^\d?$/.test(value)) return

    setOtpValues((prev) => {
      const updatedOtp = [...(prev[otpFieldName] || Array(otpLength).fill(''))]
      updatedOtp[index] = value
      return { ...prev, [otpFieldName]: updatedOtp }
    })

    onChange({
      target: {
        name: otpFieldName,
        value: (inputsRefs.current[otpFieldName] || []).map((el) => el?.value || '').join(''),
      },
    } as React.ChangeEvent<HTMLInputElement>)

    if (value && index < otpLength - 1) {
      inputsRefs.current[otpFieldName]?.[index + 1]?.focus()
    }
  }

  const handleOTPKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    otpFieldName: string,
  ) => {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      setOtpValues((prev) => {
        const updatedOtp = [...(prev[otpFieldName] || [])]
        updatedOtp[index - 1] = ''
        return { ...prev, [otpFieldName]: updatedOtp }
      })
      inputsRefs.current[otpFieldName]?.[index - 1]?.focus()
    }
  }

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      setSelectedFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const renderFileDetails = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="mt-2">
        <p className="text-sm text-gray-600">
          {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      </div>
    ))
  }

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {fields.map((field, index) => (
        <div key={index} className="space-y-[]">
          {field.label && (
            <label
              htmlFor={field.name}
              className="block text-[#0B0B0B] text-[14px] font-[400] mb-[4px] mt-[12px]"
            >
              {field.label}
            </label>
          )}

          <div
            className={`${field.type === 'otp' ? 'flex gap-2' : 'flex items-center gap-[8px]'} ${
              field.type === 'file'
                ? 'flex gap-2 p-0 w-full bg-[transparent] border-none '
                : 'flex items-center gap-[8px]'
            } w-full border mb-[12px] ${
              field.error ? 'border-red-500' : 'border-[#B3FAFF]'
            }  rounded-[6px] p-[12px] bg-white`}
          >
            {/* Optional Icon */}
            {field.icon && <span>{field.icon}</span>}

            {/* OTP Input */}
            {field.type === 'otp' ? (
              (() => {
                // const otpLength = field.otpLength || 6
                // const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''))
                // const inputsRef = useRef<HTMLInputElement[]>([])

                return (
                  <div className="w-full flex items-center justify-between">
                    {Array.from({ length: field.otpLength || 6 }).map((_, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={otpValues[field.name]?.[idx] || ''}
                        onChange={(e) =>
                          handleOTPChange(
                            e.target.value,
                            idx,
                            field.name,
                            field.otpLength || 6,
                            field.onChange,
                          )
                        }
                        onKeyDown={(e) => handleOTPKeyDown(e, idx, field.name)}
                        ref={(el) => {
                          if (!inputsRefs.current[field.name]) {
                            inputsRefs.current[field.name] = []
                          }
                          if (el) inputsRefs.current[field.name][idx] = el
                        }}
                        className="w-10 h-10 text-center text-xl border border-[#B3FAFF] rounded focus:outline-none"
                      />
                    ))}
                  </div>
                )
              })()
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                value={field.value || ''}
                onChange={field.onChange}
                className="w-full outline-none"
              >
                {field.options?.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'file' ? (
              <div className="w-full">
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border border-dashed border-[#B3FAFF] w-full bg-white flex items-center justify-center flex-col p-[24px]"
                >
                  <input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept=".jpg,.png,.svg,.zip"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor={field.name} className="w-full text-center cursor-pointer">
                    <h4 className="mt-[12] mb-[8px] font-[400] text-[12px] text-[#0B0B0B]">
                      Drag your file(s) to start uploading
                    </h4>
                    <p className="font-[400] text-[#8E8E93]">OR</p>
                    <button
                      type="button"
                      onClick={() => document.getElementById(field.name)?.click()}
                      className="py-[8px] px-[12px] border-2 border-[#195F7E] text-[#195F7E] rounded-[10px] font-[600] mt-[8px]"
                    >
                      Browse files
                    </button>
                  </label>
                  {renderFileDetails()}
                </div>
                <p className="font-[400] text-[12px] text-[#8E8E93] mt-[12px]">
                  Only support .jpg, .png, .svg, and .zip files (2mb below)
                </p>
              </div>
            ) : (
              // <div>
              //   <div
              //     onDragOver={handleDragOver}
              //     onDrop={handleDrop}
              //     className="border border-dashed border-[#195F7E] w-full bg-white flex items-center justify-center flex-col p-[24px]"
              //   >
              //     <input
              //       id={field.name}
              //       name={field.name}
              //       type="file"
              //       accept=".jpg,.png,.svg,.zip"
              //       multiple
              //       className="hidden"
              //       onChange={handleFileChange}
              //     />
              //     <label
              //       htmlFor="
              //     "
              //     >
              //       <h4 className="mt-[12] mb-[8px] font-[400] text-[12px] text-[#0B0B0B]">
              //         Drag your file(s) to start uploading
              //       </h4>
              //       <p className="font-[400] text-[#8E8E93] ">OR</p>
              //       <button className="py-[8px] px-[12px] border-2 border-[#195F7E] text-[#195F7E] rounded-[10px] font-[600] mt-[8px]">
              //         Browse files
              //       </button>
              //       {renderFileDetails()}
              //     </label>
              //   </div>

              //   <p className="font-[400] text-[12px] text-[#8E8E93] mt-[12px]">
              //     Only support .jpg, .png and .svg and zip files (2mb below)
              //   </p>
              // </div>
              <input
                type={field.type || 'text'}
                id={field.name}
                name={field.name}
                value={field.value || ''}
                placeholder={field.placeholder || ''}
                onChange={field.onChange}
                className="w-full outline-none"
              />
            )}
          </div>

          {field.message && (
            <p
              className={`text-end py-[4px] font-[400] text-[14px] ${
                field.error ? 'text-red-500' : 'text-[#34C759]'
              }`}
            >
              {field.message}
            </p>
          )}
        </div>
      ))}

      <div className="mt-[40px]">
        <button
          type="submit"
          className="w-full bg-[#195F7E] text-white py-3 rounded-[6px] font-[500] text-[16px]"
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  )
}

export default DynamicForm
