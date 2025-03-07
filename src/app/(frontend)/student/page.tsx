'use client'

import { Slider } from '@/components/ui/slider'
import React, { useEffect, useMemo, useState } from 'react'
import StudentNavbar from '@/app/(frontend)/components/Layouts/Student/StudentNavbar'
import StudentHeader from '@/app/(frontend)/components/Layouts/Student/StudentHeader'
import headerVector from '@/app/(frontend)/assets/images/header-vector.png'
import Image from 'next/image'
import NavUnderlineLarge from '../assets/icons/navUnderlineLg'
import SearchIcon from '../assets/icons/search'
import LocationIcon from '../assets/icons/location'
import LocationPointerIcon from '../assets/icons/locationPointerIcon'
import studentAbstractVector from '../assets/images/student-abstract-vector.svg'
import SearchAltIcon from '../assets/icons/searchAltIcon'
import MenuIcon from '../assets/icons/menu'
import NotificationBellIcon from '../assets/icons/notificationBell'
import FilterAltIcon from '../assets/icons/filterAltIcon'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import getAge from '@/utilities/getAge'
import fetchDocs from '@/services/fetchDocs'
import Loader from '../components/Layouts/Loader'
import dynamic from 'next/dynamic'
import { ValidationErrors } from '@/utilities/types'
import { ValidationFieldError } from 'payload'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Company } from '@/payload-types'
import searchJobs from '@/services/searchJobs'
import { toast } from 'sonner'
import FieldError from '@/components/FieldError'
import FormError from '@/components/FormError'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import courseAreas from '@/utilities/courseAreas'
import CompanyCard from '../components/Cards/CompanyCard'

const Page = () => {
  const { data: session } = useSession()

  const [loading, setLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<any[]>([])
  const [searchedCompanies, setSearchedCompanies] = useState<any[]>([])
  const [distance, setDistance] = useState<number[]>([20])
  const [filter, setFilter] = useState<{ careerArea: string }>({ careerArea: '' })
  const [page, setPage] = useState<number>(1)

  const user = useMemo<any>(() => session?.user, [session])

  const filteredCompanies = useMemo<any[]>(
    () =>
      searchedCompanies.filter((company) => {
        return filter.careerArea ? company.courseAreas.includes(filter.careerArea) : true
      }),
    [searchedCompanies, filter],
  )

  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/(frontend)/components/Layouts/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  )

  const handleCourseAreaChange = (courseArea: string) => {
    setPage(1)
    setFilter({ careerArea: courseArea })
  }

  const fetchCompanies = async () => {
    const res: any = await fetchDocs('companies')
    setCompanies(res.docs)
    setLoading(false)
  }

  const searchJobsMtn = useMutation({
    mutationFn: async (company: Company) => {
      try {
        const res = await searchJobs({
          name: company.name,
          ...(company.address ? { address: company.address } : {}),
        })
        console.log('res', res)
        setPage(1)
        setFilter({ careerArea: '' })
        return res
      } catch {
        toast.error('An error occured while fetching jobs; pls try again later')
      }
    },
  })

  const form = useForm<Company>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        // const fieldNamesToValidate = ['name']

        // const emptyRequiredFields = Companies.fields
        //   .filter((field: Field & { required: boolean; name: string }) =>
        //     fieldNamesToValidate.includes(field.name),
        //   ) // Filter only specified fields
        //   .reduce<object>(
        //     (acc: ValidationFieldError, field: Field & { required: boolean; name: string }) => ({
        //       ...acc,
        //       ...(field?.required && !value[field.name] && { [field.name]: 'Required' }),
        //     }),
        //     {},
        //   )

        // if (Object.keys(emptyRequiredFields).length) {
        //   return {
        //     form: 'Some required fields are missing. Please fill out all mandatory fields to proceed.',
        //     fields: emptyRequiredFields,
        //   }
        // }

        const res: any = await searchJobsMtn.mutateAsync(value)
        if ((res as ValidationErrors)?.errors?.[0]?.data?.errors?.length) {
          return {
            form: (res as ValidationErrors).errors[0].message,
            fields: (res as ValidationErrors).errors[0].data.errors.reduce<object>(
              (acc: ValidationFieldError, err) => ({
                ...acc,
                [err.path]: err.message,
              }),
              {},
            ),
          }
        }

        setSearchedCompanies(res.docs)

        return null
      },
    },
  })

  useEffect(() => {
    fetchCompanies()
  }, [user])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="block lg:hidden min-h-screen relative text-sm text-white">
            <div className="bg-[#195F7E] container pt-4 pb-1">
              <StudentHeader />
              <StudentNavbar />
            </div>
            <div className="container">
              <main className="py-1">
                <div className="mb-1">
                  {/* <iframe
                    className="w-full rounded-xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7193.3143200417435!2d-100.28889498759587!3d25.649501748537784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bfbef1c51a37%3A0x2aeb9d19e4fbb44b!2sCentro%20Deportivo%20Borregos%20II!5e0!3m2!1sen!2sng!4v1736921701249!5m2!1sen!2sng"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                  <Map companies={searchedCompanies} />
                </div>
                <div>
                  <h5 className="text-black mb-3 font-bold">Companies Search</h5>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      form.handleSubmit()
                    }}
                  >
                    <div className="relative p-2 border border-[#F1F1F1] rounded mb-2">
                      <form.Field name="name">
                        {(field) => {
                          return (
                            <>
                              <div className="relative">
                                <SearchIcon className="absolute -left-2 bottom-[-1px] text-gray-500" />
                                <input
                                  name={field.name}
                                  value={field.state.value || ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="w-full text-xs indent-6 text-black placeholder:text-[#8E8E93] outline-none border-0"
                                  placeholder="Search Company Name"
                                />
                              </div>
                              <div className="indent-7">
                                <FieldError field={field} />
                              </div>
                            </>
                          )
                        }}
                      </form.Field>
                    </div>
                    <div className="relative p-2 border border-[#F1F1F1] rounded mb-2">
                      <form.Field name="address">
                        {(field) => {
                          return (
                            <>
                              <div className="relative">
                                <LocationPointerIcon className="absolute left-0 top-[2px]" />
                                <input
                                  name={field.name}
                                  value={field.state.value || ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  className="w-full text-xs indent-6 text-black placeholder:text-[#8E8E93] outline-none border-0"
                                  placeholder="Search Destination (Office Address, Cities or Towns)"
                                />
                              </div>
                              <div className="indent-7">
                                <FieldError field={field} />
                              </div>
                            </>
                          )
                        }}
                      </form.Field>
                    </div>
                    <div className="relative p-2 border border-[#F1F1F1] rounded mb-2">
                      <div className="text-xs text-[#8E8E93] mb-4">Distance Search</div>
                      <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-4 grid-rows">
                          <div className="flex justify-between mb-2">
                            <div className="text-xs text-[#8E8E93]">0 km</div>
                            <div className="text-xs text-[#8E8E93]">100 km</div>
                          </div>
                          <Slider
                            className="col-span-5 flex"
                            value={distance}
                            onValueChange={setDistance}
                            max={100}
                            step={1}
                          />
                        </div>
                        <div className="border border-[#F1F1F1] text-xs text-[#0B7077] px-2 flex items-center">
                          {distance}km
                        </div>
                      </div>
                    </div>
                    <div>
                      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                          <>
                            <Button
                              type="submit"
                              disabled={!canSubmit}
                              size="lg"
                              className="bg-[#195F7E] rounded-xl p-4 w-full"
                            >
                              Search Vacancies {isSubmitting && <Spinner />}
                            </Button>
                            <FormError form={form} />
                          </>
                        )}
                      </form.Subscribe>
                    </div>
                  </form>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:block hidden bg-[#195F7E] min-h-screen relative text-white">
            <Image
              src={studentAbstractVector}
              alt="student-abstract-vector"
              className="absolute top-[-50px] right-0 z-0"
            />

            <div>
              <div className="container">
                <nav className="relative grid grid-cols-5 gap-2 py-4 z-10">
                  <div className="flex items-center">
                    <Image
                      width={48}
                      height={48}
                      src="/unilag-logo.png"
                      alt="Logo"
                      className="h-8 w-8 mr-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <span onClick={() => signOut()} className="font-oleo text-white text-3xl">
                      Welcome {user?.firstName}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="relative w-3/4">
                      <input
                        type="text"
                        placeholder="Search For Companies"
                        className="w-full outline-none text-black px-4 py-3 rounded-xl border border-black placeholder:text-black text-sm"
                      />
                      <SearchAltIcon className='className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"' />
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="flex items-center">
                      <div className="cursor-pointer hover:bg-black p-2 rounded">
                        <FilterAltIcon />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="cursor-pointer hover:bg-black p-2 rounded">
                        <NotificationBellIcon />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="cursor-pointer hover:bg-black p-2 rounded">
                        <MenuIcon />
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              <main>
                <div className="container">
                  <div className="grid sm:grid-cols-2 mb-4">
                    <div>
                      <div className="grid sm:grid-cols-3 gap-8">
                        <div>
                          <Image
                            width={197}
                            height={235}
                            src="/smiling-woman.png"
                            alt="smiling woman"
                          />
                        </div>
                        <div className="col-span-2 flex items-center">
                          <div className="grid grid-rows-4 gap-1">
                            <div>
                              <span className="text-3xl font-bold">
                                {user?.firstName}{' '}
                                <span className="text-[#FFE75C]">{user?.lastName}</span>
                              </span>
                              <span className="ms-4 text-[#FFE75C]">{getAge(user?.dob)}</span>
                            </div>
                            <div className="flex justify-between">
                              <div>
                                <span className="">unilag {user?.level}</span>
                              </div>
                              <div>
                                <span className="">{user?.course}</span>
                              </div>
                            </div>
                            <div>
                              <span>{user?.homeAddress}</span>
                            </div>
                            <div className="flex gap-2">
                              <div className="bg-[#0B7077] text-white px-4 py-2 rounded-2xl">
                                <span>0 Duration</span>
                              </div>
                              <div className="bg-[#FFD836] text-[#195F7E] px-4 py-2 rounded-2xl">
                                <span>Upgrade</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-5 rounded-xl bg-[#0B7077] gap-2 p-5 mb-0">
                    <div className="col-span-4 self-center">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <Link href="#" className="relative group block text-center">
                            <span className="text-xl">Map Search</span>
                            <NavUnderlineLarge />
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/student/applications/pending"
                            className="relative group block text-center"
                          >
                            <span className="text-xl">Pending</span>
                            <NavUnderlineLarge />
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/student/applications/approved"
                            className="relative group block text-center"
                          >
                            <span className="text-xl">Approved</span>
                            <NavUnderlineLarge />
                          </Link>
                        </div>
                        <div>
                          <Link href="/student" className="relative group block text-center">
                            <span className="text-xl">History</span>
                            <NavUnderlineLarge />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="z-10">
                      <Link href="/student/reports/create">
                        <button className="text-[#0B7077] bg-white rounded px-4 py-2">
                          Report Page
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-5 gap-4">
                  {/* <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      form.handleSubmit()
                    }}
                  >
                    <div className="bg-white rounded-xl mb-4 p-5 grid grid-cols-12">
                      <Slider
                        className="col-span-9"
                        value={distance}
                        onValueChange={setDistance}
                        max={100}
                        step={1}
                      />
                      <span className="col-span-3 text-sm text-black text-right">{distance}km</span>
                    </div>
                    <div className="bg-white rounded-xl mb-4">
                      <div className="relative border-b py-2">
                        <form.Field name="name">
                          {(field) => {
                            return (
                              <>
                                <div className="relative">
                                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                  <input
                                    name={field.name}
                                    value={field.state.value || ''}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Search Job"
                                    className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                                  />
                                </div>
                                <div className="indent-7">
                                  <FieldError field={field} />
                                </div>
                              </>
                            )
                          }}
                        </form.Field>
                      </div>
                      <div className="relative py-2">
                        <div className="flex absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-[27px] w-[27px] rounded-full bg-[#dfe1fa]">
                          <LocationIcon className="m-auto" />
                        </div>
                        <form.Field name="address">
                          {(field) => {
                            return (
                              <>
                                <input
                                  name={field.name}
                                  value={field.state.value || ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  placeholder="Location"
                                  className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                                />
                                <FieldError field={field} />
                              </>
                            )
                          }}
                        </form.Field>
                      </div>
                      <div className="pb-1 mx-1">
                        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                          {([canSubmit, isSubmitting]) => (
                            <>
                              <Button
                                type="submit"
                                disabled={!canSubmit}
                                size="lg"
                                className="bg-[#195F7E] rounded-xl p-4 w-full"
                              >
                                Search Job {isSubmitting && <Spinner />}
                              </Button>
                              <FormError form={form} />
                            </>
                          )}
                        </form.Subscribe>
                      </div>
                    </div>
                  </form> */}
                  <div className="col-span-5">
                    <div className="w-full bg-white text-black py-4 px-8 grid grid-cols-3 gap-2">
                      <div className="flex self-center">
                        <h3 className="text-lg">Company Search</h3>
                      </div>
                      <div className="col-span-2">
                        <form
                        // onSubmit={(e) => {
                        //   e.preventDefault()
                        //   e.stopPropagation()
                        //   form.handleSubmit()
                        // }}
                        >
                          <div className="grid grid-cols-3 gap-2">
                            <div className="relative border rounded">
                              <form.Field name="name">
                                {(field) => {
                                  return (
                                    <>
                                      <div className="relative">
                                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                        <input
                                          name={field.name}
                                          value={field.state.value || ''}
                                          onBlur={field.handleBlur}
                                          onChange={(e) => {
                                            field.handleChange(e.target.value)
                                            form.handleSubmit()
                                          }}
                                          placeholder="Search Job"
                                          className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                                        />
                                      </div>
                                      <div className="indent-7">
                                        <FieldError field={field} />
                                      </div>
                                    </>
                                  )
                                }}
                              </form.Field>
                            </div>

                            <div className="relative border rounded">
                              <div className="flex absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-[27px] w-[27px] rounded-full bg-[#dfe1fa]">
                                <LocationIcon className="m-auto" />
                              </div>
                              <form.Field name="address">
                                {(field) => {
                                  return (
                                    <>
                                      <input
                                        name={field.name}
                                        value={field.state.value || ''}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                          field.handleChange(e.target.value)
                                          form.handleSubmit()
                                        }}
                                        placeholder="Location"
                                        className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                                      />
                                      <FieldError field={field} />
                                    </>
                                  )
                                }}
                              </form.Field>
                            </div>
                            <div className="bg-white rounded-xl grid grid-cols-12">
                              <Slider
                                className="col-span-9"
                                value={distance}
                                onValueChange={setDistance}
                                max={100}
                                step={1}
                              />
                              <div className="col-span-3 flex self-center">
                                <span className="text-sm border text-black text-right p-2 ms-2 rounded">
                                  {distance}km
                                </span>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      {searchedCompanies.length ? (
                        <div className="w-1/4 bg-white text-black p-4 relative mt-[-70px]">
                          <div className="mb-4">
                            <div className="flex justify-between self-center mb-4">
                              <h3 className="text-lg">Search Results</h3>
                            </div>
                            <div className="flex flex-row w-full overflow-x-auto whitespace-nowrap gap-x-4 scrollbar-hide">
                              <div
                                onClick={() => handleCourseAreaChange('')}
                                className={`${filter.careerArea === '' ? 'bg-[#195F7E] text-white ' : 'text-[#195F7E] '} p-2 rounded cursor-pointer`}
                              >
                                All Career Area
                              </div>
                              {courseAreas.map((courseArea) => (
                                <div
                                  onClick={() => handleCourseAreaChange(courseArea)}
                                  key={courseArea}
                                  className={`${filter.careerArea === courseArea ? 'bg-[#195F7E] text-white ' : 'text-[#195F7E] '} p-2 rounded cursor-pointer`}
                                >
                                  {courseArea}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div
                            className={`h-[660px] overflow-y-auto grid grid-cols-2 gap-x-4 gap-y-6 py-2`}
                          >
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                            {filteredCompanies.map((company, companyIndex) => (
                              <CompanyCard key={`company-${companyIndex}`} company={company} />
                            ))}
                          </div>
                        </div>
                      ) : null}
                      <div className={`h-[740px] ${searchedCompanies.length ? 'w-3/4' : 'w-full'}`}>
                        <Map companies={filteredCompanies} />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <div className="container my-10 lg:my-24">
            <div className="grid gap-4 lg:gap-10">
              <div className="text-center">
                <h4 className="text-xl lg:text-4xl text-[#FD661F] font-medium relative">
                  Recommended Companies
                  <Image
                    className="absolute right-[32%] hidden lg:block"
                    src={headerVector}
                    alt="header-vector"
                  />
                </h4>
              </div>
              <div className="grid lg:grid-cols-10">
                <div className="lg:col-start-2 lg:col-span-8 grid grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-5">
                  <div className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs">
                    All Programmes
                  </div>
                  {courseAreas.map((courseArea) => (
                    <div
                      key={courseArea}
                      className="cursor-pointer transition text-center rounded-lg p-2 border-2 border-[#818C96] text-[#818C96] hover:border-[#195F7E] hover:bg-[#195F7E] hover:text-white text-xs"
                    >
                      {courseArea}
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid lg:grid-cols-4 gap-5">
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Page
