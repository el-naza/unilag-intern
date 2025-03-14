'use client'
import hero from '../../assets/images/company-hero-bg.png'
import { useEffect, useState } from 'react'
import NavBar from '../../common/nav-bar'
import StudentProfileCard from '../../components/Cards/studentProfileCard'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../../components/Layouts/Loader'
import FilterIcon from '../../assets/icons/filter'
import AppDropDown from '../../components/Dropdown'
import Select from 'react-select'
import FilterListIcon from '../../assets/icons/filterList'
import searchStudents from '@/services/searchStudents'
import { Student } from '@/payload-types'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/spinner'

type Option = { value: string | number; label: string }

export default function CompanyHomePage() {
  const [active, setActive] = useState<string>('  All Career Area')
  const [selected, setSelected] = useState<string | null>(null)
  const [antionAnchor, setActionAnchor] = useState<HTMLElement | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [cleaerSearchLoading, setclearSearchLoading] = useState<boolean>(false)
  const [students, setStudents] = useState<any>([])
  const [selectedCategoryOptions, setSelectedCategoryOptions] = useState<Option[]>([])
  const [selectedFacultyOptions, setSelectedFacultyOptions] = useState<Option[]>([])
  const [selectedDepartmentOptions, setSelectedDepartmentOptions] = useState<Option[]>([])
  const [searchParams, setSearchParams] = useState({ internshipType: '', gender: '', matricNo: '' })
  const [error, setError] = useState<string | null>(null)

  const careers = [{ title: 'All Career Area' }, { title: 'SIWES' }, { title: 'Teaching Practice' }]

  const fetchStudents = async () => {
    const res: any = await fetchDocs('students')
    console.log(res)
    setStudents(res.docs)
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
  }, [])
 
  const internCategoryOptions = [
    { value: 'SIWES', label: 'SIWES' },
    { value: 'TEACHING PRACTICE', label: 'Teaching Practice' },
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

  const handleSearch = async () => {
    setSearchLoading(true)
    setError(null)

    const formattedSearchParams = {
      ...searchParams,
      internshipType: selectedCategoryOptions.map((opt) => opt.value).join(','),
      faculty: selectedFacultyOptions.map((opt) => opt.value).join(','),
      department: selectedDepartmentOptions.map((opt) => opt.value),
      // gender: selected,
      gender: selected || undefined,
    }

    try {
      const response = await searchStudents<Student[]>(formattedSearchParams as {})

      if ('errors' in response) {
        setError('An error occurred while fetching students.')
      } else {
        setStudents(response?.docs)
      }
    } catch (err) {
      setError('Failed to fetch students.')
    } finally {
      setSearchLoading(false)
    }
  }
  const clearFilters = async () => {
    setclearSearchLoading(true)
    setSelected('')
    setSearchParams({})
    setSelectedCategoryOptions([])
    setSelectedFacultyOptions([])
    setSelectedDepartmentOptions([])

    try {
      await fetchStudents()
    } finally {
      setclearSearchLoading(false)
    }
  }

  const handleFilterClick = async (type) => {
    setActive(type)
    setLoading(true)

    const formattedSearchParams = {
      ...searchParams,
      internshipType: type === 'All Career Area' ? undefined : type, // Use type directly
    }

    try {
      if (type === 'All Career Area') {
        await fetchStudents() // Fetch all students when "All Career Area" is selected
      } else {
        const response = await searchStudents<Student[]>(formattedSearchParams as {})
        setStudents(response.docs)
      }
    } finally {
      setLoading(false)
    }
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
                    onClick={() => handleFilterClick(c.title)}

                    // onClick={() => setActive(c.title)}
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
                      onClick={() => setSelected('FEMALE')}
                    >
                      <input
                        type="radio"
                        name="student"
                        checked={selected === 'FEMALE'}
                        onChange={() => setSelected('FEMALE')}
                        className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                      />
                      <p className="font-[400] text-[14px] text-[#454545]">Female Student</p>
                    </div>

                    <div
                      className="mb-[6px] py-[9.6px] px-[5.6px] flex items-center gap-[5.6px] cursor-pointer"
                      onClick={() => setSelected('MALE')}
                    >
                      <input
                        type="radio"
                        name="student"
                        checked={selected === 'MALE'}
                        onChange={() => setSelected('MALE')}
                        className="h-[13px] w-[13px] accent-[#0B7077] border border-[#B7B7B7]"
                      />
                      <p className="font-[400] text-[14px] text-[#454545]">Male Student</p>
                    </div>

                    <div className="mt-[20px]">
                      <div className="mb-[20px]">
                        <p className="font-[400] text-[12px]">Intern Categories</p>

                        <Select
                          options={internCategoryOptions}
                          isMulti
                          value={selectedCategoryOptions}
                          onChange={(options) => setSelectedCategoryOptions(options as any)}
                          placeholder="Select Category"
                        />
                      </div>
                      <div className="mb-[20px]">
                        <p className="font-[400] text-[12px]">Intern Faculty</p>

                        <Select
                          options={internFacultyOptions}
                          isMulti
                          value={selectedFacultyOptions}
                          onChange={(options) => setSelectedFacultyOptions(options as any)}
                          placeholder="Select Faculty"
                        />
                      </div>
                      <div className="mb-[20px]">
                        <p className="font-[400] text-[12px]">Intern Department</p>

                        <Select
                          options={internDepartmentOptions}
                          isMulti
                          value={selectedDepartmentOptions}
                          onChange={(options) => setSelectedDepartmentOptions(options as any)}
                          placeholder="Select Department"
                        />
                      </div>
                    </div>

                    <div className="lg:flex items-center justify-between ">
                      <button
                        className="h-[32px] w-[132px] rounded-[4px] text-[14px] font-[400] bg-transparent text-[#0B7077]  "
                        onClick={clearFilters}
                        disabled={cleaerSearchLoading}
                      >
                        {cleaerSearchLoading ? 'clearing...' : 'Clear'}
                      </button>
                      <Button
                        className="h-[32px] w-[132px] rounded-[4px] text-[14px] font-[400] bg-[#0B7077] text-white"
                        onClick={handleSearch}
                        disabled={searchLoading}
                      >
                        {searchLoading ? <Spinner /> : 'Result'}
                      </Button>
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
            {students?.length > 0 ? (
              students.map((student) => <StudentProfileCard key={student.id} student={student} />)
            ) : (
              <p>No students found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
