'use client'
import { useRouter } from 'next/navigation'
import NavBar from '../../common/nav-bar'
import ArrowIcon from '../../assets/icons/arrow'

import { useState } from 'react'
import CalenderIcon from '../../assets/icons/calander'

import FileUploader from '../../components/Form/fileUploader'
import MainButton from '../../components/Ui/button'
import TextArea from '../../components/Form/textArea'
import SelectTag from '../../components/Form/select'

export default function InternshipPost() {
  const router = useRouter()
  const [requirements, setRequirements] = useState('')
  const [description, setDescription] = useState('')
  const [selectedArea, setSelectedArea] = useState('')

  const handleFileChange = (files: File[]) => {
    console.log('Selected files:', files)
  }

  const areas = [
    { value: 'north', label: 'North Area' },
    { value: 'south', label: 'South Area' },
    { value: 'east', label: 'East Area' },
    { value: 'west', label: 'West Area' },
  ]

  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar fill="#0B7077" />
      </nav>
      <div className=" max-w-[866px] m-auto lg:mt-[58px] pb-[100px] ">
        <div className="flex items-center ">
          <button
            className="flex items-center gap-[6px] font-[400] text-[14px] p-[24px] lg:p-0"
            onClick={() => router.back()}
          >
            <ArrowIcon />
            Back
          </button>
          <div className=" absolute left-0 right-0 w-full flex items-center justify-center m-auto">
            <h3 className="font-[500] text-[20px] ">Internship Post</h3>
          </div>
        </div>

        <div className="gap-5 lg:flex-row md:flex-row px-[10px] py-[6px] px-4">
          <h3 className="font-[700] text-[16px] mb-[12px] mt-[24px]">Post Image</h3>

          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-6 w-full">
            <div className="h-[217px] lg:w-[376px] w-full  relative overflow-hidden ">
              <FileUploader
                id="file-upload"
                name="fileUpload"
                accept=".jpg,.png,.svg,.zip"
                multiple={true}
                maxFileSize={2} // 2MB
                onFileChange={handleFileChange}
              />
            </div>
            <div className="lg:w-[446px]  w-[100%]">
              <div className="mb-[12px]">
                <TextArea
                  label="Post Description"
                  placeholder="Enter job requirements"
                  value={description}
                  onChange={(value) => setDescription(value)}
                />
              </div>
              <div className="mb-[12px]">
                <SelectTag
                  label="Select Job Area"
                  options={areas}
                  placeholder="Choose an area"
                  value={selectedArea}
                  onChange={(value) => setSelectedArea(value)}
                />
              </div>
              <div className="mb-[12px]">
                <label htmlFor="" className="mb-[8px] font-[400] text-[14px] text-[#48484A]">
                  Acceptance Period
                </label>
                <div className="max-h-[120px] w-full border  rounded-[4px] bg-white flex items-center justify-between  font-[400] text-[14px] text-[#48484A] py-[8px] px-[12px] ">
                  <p className="text-[#8E8E93] font-[400] text-[12px]">00/00/00 - 00/00/00</p>
                  <CalenderIcon />
                </div>
              </div>
              <div className="mb-[12px]">
                <TextArea
                  label="Job Description"
                  placeholder="Enter job requirements"
                  value={requirements}
                  onChange={(value) => setRequirements(value)}
                />
              </div>
              <MainButton
                title="Send Post"
                borderRadius="rounded"
                fontWeight="font-[400]"
                fontSize="text-[14px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
