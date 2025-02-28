'use client'
import hero from '../../assets/images/company-hero-bg.png'
import studentImage from '../../assets/images/student-img.png'
import { useEffect, useState } from 'react'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import FilterIcon from '../../assets/icons/filter'
import AppDropDown from '../../components/Dropdown'
import Select from 'react-select'
import FilterListIcon from '../../assets/icons/filterList'

type Option = { value: string | number; label: string }

export default function CompanyHomePage() {
  const [active, setActive] = useState<string>('  All Career Area')
  const [selected, setSelected] = useState<string | null>(null)
  const [antionAnchor, setActionAnchor] = useState<HTMLElement | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [students, setStudents] = useState<any>([])
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState<Option[]>([])
  const [selectedFacultyOptions, setSelectedFacultyOptions] = useState<Option[]>([])
  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState<Option[]>([])

  const careers = [
    { title: '  All Career Area' },
    { title: 'SIWES' },
    { title: 'Teaching Practice' },
    { title: 'Housemanship' },
    { title: 'Others' },
  ]

  const fetchStudents = async () => {
    const res: any = await fetchDocs('students')
    setStudents(res.docs)
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const internCategoryOptions = [
    { value: 'siwes', label: 'SIWES' },
    { value: 'teaching-practice', label: 'Teaching Practice' },
    { value: 'housemanship', label: 'Housemanship' },
  ]

  const internFacultyOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
  ]

  const internDepartmentOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
  ]

  const getCustomStyles = () => ({
    control: (base) => ({
      ...base,
      borderRadius: '6px',
      padding: '2px',
      fontSize: '10px',
      border: '1px solid #e0e0e0',
      boxShadow: 'none',
      '&:hover': { borderColor: '#ccc' },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#f8f8f8',
      borderRadius: '6px',
      padding: '1px',
      display: 'flex',
      alignItems: 'center',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#454545',
      fontSize: '10px',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: 'red',
      cursor: 'pointer',
      '&:hover': { backgroundColor: 'transparent', color: 'darkred' },
    }),
  })

  const removeSelectedOption = (optionToRemove, type) => {
    if (type === 'category') {
      setSelectedCategoryOptions((prev) =>
        prev.filter((option) => option.value !== optionToRemove.value),
      )
    } else if (type === 'faculty') {
      setSelectedFacultyOptions((prev) =>
        prev.filter((option) => option.value !== optionToRemove.value),
      )
    } else if (type === 'department') {
      setSelectedDepartmentOptions((prev) =>
        prev.filter((option) => option.value !== optionToRemove.value),
      )
    }
  }

  const [dropdowns, setDropdowns] = useState<{ [key: string]: HTMLElement | null }>({})

  const handleOpenDropdown = (key: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setDropdowns((prev) => ({ ...prev, [key]: event.currentTarget }))
  }

  const handleCloseDropdown = (key: string) => {
    setDropdowns((prev) => ({ ...prev, [key]: null }))
  }

  return (
    <div>
      <div
        className="relative"
        style={{
          backgroundImage: `url(${hero.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 'auto',
          paddingBottom: '34px',
        }}
      >
        <nav className="text-[#FFFFFF]">
          <NavBar />
        </nav>

        <div className="mt-[67px]">
          <div className="max-w-[650px] m-auto flex items-center justify-center flex-col px-4">
            <p className="font-[500] text-[24px] leading-[29px] text-[#FFFFFF] max-w-[535px] text-center">
              Quickly Find the Right Students for Your Company!
            </p>
            <div className="mt-[32px] flex items-center justify-center lg:gap-3 flex-wrap">
              {careers &&
                careers.map((c) => (
                  <button
                    className={`p-[8px] rounded-[4px] font-[400] text-[14px] text-[#FFFFFF] ${
                      active === c.title ? 'bg-[#0B7077]' : ''
                    }`}
                    key={c.title}
                    onClick={() => setActive(c.title)}
                  >
                    {c.title}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full md:max-w-[866px] m-auto px-4 pb-[100px]">
        <div className="flex items-start justify-between w-full mt-5">
          <div className="flex items-center gap-2 w-[152px]">
            <p className=" lg:font-[500] lg:text-[20px] text-nowrap">Student List</p>
            <button className="" onClick={(e) => handleOpenDropdown('filter', e)}>
              <FilterListIcon />
            </button>
          </div>
          <AppDropDown
            anchorEl={dropdowns['filter']}
            handleClose={() => handleCloseDropdown('filter')}
          >
            <div className=" py-[12px] px-[8px] rounded-[4px]">
              <div
                className="mb-[6px] py-[9.6px] px-[5.6px] flex items-center gap-[5.6px] cursor-pointer"
                onClick={() => setSelected('Distance')}
              >
                <input
                  type="radio"
                  name="student"
                  checked={selected === 'Distance'}
                  onChange={() => setSelected('Distance')}
                  className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                />
                <p className="font-[400] text-[14px] text-[#454545]">Distance (Closest)</p>
              </div>

              <div
                className="mb-[6px] py-[9.6px] px-[5.6px] flex items-center gap-[5.6px] cursor-pointer"
                onClick={() => setSelected('Alphabetical')}
              >
                <input
                  type="radio"
                  name="student"
                  checked={selected === 'Alphabetical'}
                  onChange={() => setSelected('Alphabetical')}
                  className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                />
                <p className="font-[400] text-[14px] text-[#454545]">Alphabetical</p>
              </div>
              <div
                className="mb-[6px] py-[9.6px] px-[5.6px] flex items-center gap-[5.6px] cursor-pointer"
                onClick={() => setSelected('Top CGPA')}
              >
                <input
                  type="radio"
                  name="student"
                  checked={selected === 'Top CGPA'}
                  onChange={() => setSelected('Top CGPA')}
                  className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                />
                <p className="font-[400] text-[14px] text-[#454545]">Top CGPA</p>
              </div>
            </div>
          </AppDropDown>
          <div className="flex items-center gap-2 overflow-x-scroll max-w-[550px]">
            {[
              ...selectedCategoryOptions,
              ...selectedFacultyOptions,
              ...selectedDepartmentOptions,
            ].map((option) => (
              <div
                key={option.value as string}
                className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-2"
              >
                <span className="text-sm text-[#454545] text-nowrap">{option.label as string}</span>
                <button
                  onClick={() =>
                    removeSelectedOption(
                      option,
                      selectedCategoryOptions.includes(option)
                        ? 'category'
                        : selectedFacultyOptions.includes(option)
                          ? 'faculty'
                          : 'department',
                    )
                  }
                  className="text-red-500 text-sm"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
          <div>
            <button className="" onClick={(e) => setActionAnchor(e.currentTarget)}>
              <FilterIcon />
            </button>

            <div className="mt-[12px]">
              <AppDropDown anchorEl={antionAnchor} handleClose={() => setActionAnchor(null)}>
                <div className="w-[284px] max-w-full py-[12px] px-[8px] rounded-[4px]">
                  <div className="flex items-start justify-between mb-[16px]">
                    <p className="font-[400] text-[16px]">Filter by</p>
                    <button onClick={() => setActionAnchor(null)}>
                      {' '}
                      <svg
                        width="9.33"
                        height="9.33"
                        viewBox="0 0 10 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.08073 4.41233L8.60932 0.883739C8.86967 0.623389 9.29178 0.623389 9.55213 0.883739C9.81248 1.14409 9.81248 1.5662 9.55213 1.82655L6.02354 5.35514L9.55213 8.88374C9.81248 9.14409 9.81248 9.5662 9.55213 9.82655C9.29178 10.0869 8.86967 10.0869 8.60932 9.82655L5.08073 6.29795L1.55213 9.82655C1.29178 10.0869 0.869674 10.0869 0.609325 9.82655C0.348975 9.5662 0.348975 9.14409 0.609325 8.88374L4.13792 5.35514L0.609325 1.82655C0.348975 1.5662 0.348975 1.14409 0.609325 0.883739C0.869674 0.623389 1.29178 0.623389 1.55213 0.883739L5.08073 4.41233Z"
                          fill="#8E8E93"
                        />
                      </svg>
                    </button>
                  </div>

                  <div>
                    <p className="font-[400] text-[14px] text-[#8E8E93] mb-[8px]">
                      Student Preference
                    </p>

                    <div
                      className="mb-[6px] py-[9.6px] px-[5.6px] flex items-center gap-[5.6px] cursor-pointer"
                      onClick={() => setSelected('female')}
                    >
                      <input
                        type="radio"
                        name="student"
                        checked={selected === 'female'}
                        onChange={() => setSelected('female')}
                        className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                      />
                      <p className="font-[400] text-[14px] text-[#454545]">Female Student</p>
                    </div>

                    <div
                      className="mb-[6px] py-[9.6px] px-[5.6px] flex items-center gap-[5.6px] cursor-pointer"
                      onClick={() => setSelected('male')}
                    >
                      <input
                        type="radio"
                        name="student"
                        checked={selected === 'male'}
                        onChange={() => setSelected('male')}
                        className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                      />
                      <p className="font-[400] text-[14px] text-[#454545]">Male Student</p>
                    </div>

                    <div className="mt-[20px]">
                      <div className="mb-[20px]">
                        <p className="font-[400] text-[12px]">Intern Categories</p>
                        <Select
                          options={internCategoryOptions as []}
                          isMulti
                          value={selectedCategoryOptions}
                          onChange={setSelectedCategoryOptions as any}
                          placeholder="select Category"
                          className="basic-multi-select text-[10px] font-[400] text-[#454545] border-[#E0E0E0] rounded-[6px] mt-[8px]"
                          classNamePrefix="select"
                          styles={getCustomStyles()}
                        />
                      </div>
                      <div className="mb-[20px]">
                        <p className="font-[400] text-[12px]">Intern Faculty</p>
                        <Select
                          options={internFacultyOptions as []}
                          isMulti
                          value={selectedFacultyOptions}
                          onChange={setSelectedFacultyOptions as any}
                          placeholder="select Faculty"
                          className="basic-multi-select text-[10px] font-[400] text-[#454545] border-[#E0E0E0] rounded-[6px] mt-[8px]"
                          classNamePrefix="select"
                          styles={getCustomStyles()}
                        />
                      </div>
                      <div className="mb-[20px]">
                        <p className="font-[400] text-[12px]">Intern Faculty</p>
                        <Select
                          options={internDepartmentOptions as []}
                          isMulti
                          value={selectedDepartmentOptions}
                          onChange={setSelectedDepartmentOptions as any}
                          placeholder="select Department"
                          className="basic-multi-select text-[10px] font-[400] text-[#454545] border-[#E0E0E0] rounded-[6px] mt-[8px]"
                          classNamePrefix="select"
                          styles={getCustomStyles()}
                        />
                      </div>
                    </div>

                    <div className='lg:flex items-center justify-between '>
                      <button className="h-[32px] w-[132px] rounded-[4px] text-[14px] font-[400] bg-transparent text-[#0B7077]">
                        Clear
                      </button>
                      <button className="h-[32px] w-[132px] rounded-[4px] text-[14px] font-[400] bg-[#0B7077] text-white">
                        {' '}
                        Result
                      </button>
                    </div>
                  </div>
                </div>
              </AppDropDown>
            </div>
          </div>
        </div>
        {loading ? (
          <Loader height="auto" background="transparent" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[14px] p-[12px]">
            {students &&
              students.map((student) => <StudentProfileCard key={student.id} student={student} />)}
          </div>
        )}
      </div>
    </div>
  )
}
