'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getCompany } from '@/services/admin/companies'
import { getAllReports, getEmployments } from '@/services/admin/reports'
import { format } from 'date-fns'
import { MessageSquareText } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AssignStudent from './assign-student'

export default function CompanyDetailPage() {
  const { id }: { id: string } = useParams()

  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')
  const [company, setCompany] = useState<any>(null)
  const [siwesStudents, setSiwesStudents] = useState<any>(null)
  const [siwesReports, setSiwesReports] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchCompanyDetail = async () => {
    return getCompany('companies', id).then((res: any) => {
      console.log('Company', res.data)
      setCompany(res.data)
      setLoading(false)
    })

  }

  const fetchEmployments = async () => {
    const query = new URLSearchParams({ 'where[company]': id }).toString()
    return getEmployments('employments', query).then((res: any) => {
      console.log('Employments: ', res);
      const { docs } = res.data
      setSiwesStudents(docs)
    })
  }

   const fetchReports = async (params?: string) => {
      return getAllReports('reports', params).then((res: any) => {
        console.log('Reports: ', res);
        const { docs } = res.data
        setSiwesReports(docs)
      })
      
   }

  useEffect(() => {
    Promise.allSettled([fetchCompanyDetail(), fetchEmployments(), fetchReports()])
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-semibold text-[1.5rem]">Company Profile</h1>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-between mt-4 p-8 w-full mb-8 bg-[url(/images/profile-bg.png)] bg-cover bg-no-repeat bg-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>

          <div>
            <h3 className="font-semibold text-[1.2rem] text-white">{company?.name}</h3>
            <p className="text-sm text-white">{company?.cac}</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gray-light-2 text-black-2">Assigned Student</Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Assign Student</DialogTitle>
              <DialogDescription>Assign students to a company</DialogDescription>
            </DialogHeader>

            <AssignStudent companyId={company?.id} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3 className="font-medium text-[1.2rem]">Company Information</h3>
        <p className="text-sm">Company Basic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">Company Name</Label>
            <Input
              value={company?.name || ''}
              readOnly
              placeholder="Enter Company Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">CAC Number</Label>
            <Input
              value={company?.cac || ''}
              readOnly
              placeholder="Enter CAC Number"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Location</Label>
            <Input
              value={'Lng: ' + company?.location.longitude + ' Lat: ' + company?.location.latitude}
              readOnly
              placeholder="Enter Location"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Email</Label>
            <Input
              value={company?.email || ''}
              readOnly
              placeholder="Enter Email"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Phone</Label>
            <Input
              value={company?.phone || ''}
              readOnly
              placeholder="Enter Phone"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Website</Label>
            <Input
              value={company?.website || ''}
              readOnly
              placeholder="Enter Website"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>
        </div>

        <Label className="mt-3 block">Description</Label>
        <Textarea
          value={company?.description || ''}
          readOnly
          placeholder="Type your message here."
          className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
        />

        <h3 className="font-medium text-[1.2rem] mt-8">Siwes Students</h3>
        <p className="text-sm">Company students</p>

        <div className="mt-4">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
            <div className="relative inline-block overflow-hidden rounded-md">
              <Image
                src="/images/student-image.jpeg"
                width={500}
                height={700}
                alt="Picture"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 text-white w-full px-3 pb-1 bg-gradient-to-t from-[#00000069] to-[transparent]">
                <h4>Kota Faruq</h4>
                <p className="flex flex-wrap justify-between items-center text-sm">
                  <span>Mathematics</span> <span>2 weeks</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem] mt-8">Siwes Reports</h3>
        <p className="text-sm">All supervisors reports</p>

        <div className="mt-4">
          <div className="flex gap-4 border-[1px] border-gray-light-2 rounded-[8px] p-4">
            <div className="p-3 rounded-full grid place-content-center bg-primary text-white w-[40px] h-[40px]">
              <MessageSquareText></MessageSquareText>
            </div>
            <div>
              <h4 className="font-medium">Report 001</h4>
              <p className="text-gray-dark-3">By Fredrick Precious 02/03/2023</p>

              <div className="mt-3">
                <p className="text-primary">Message</p>
                <p className="text-gray-dark-3">Student is doing well</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
