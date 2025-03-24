'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getStudent } from '@/services/admin/students'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, MessageSquareText } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AssignCompany from './assign-company'
import { getAllReports } from '@/services/admin/reports'
import Pagination from '../../../_components/pagination'
import Spinner from '@/components/spinner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import updateDoc from '@/services/updateDoc'
import fetchStudentReports from '@/services/fetchStudentReports'

export default function StudentDetailPage() {
  const { id }: { id: string } = useParams()
  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')

  const [siwesForm, setSiwesForm] = useState<File | null>(null)
  const [student, setStudent] = useState<any>(null)
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [grade, setGrade] = useState('')
  const [reportId, seReportId] = useState('')

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSiwesForm(event.target.files[0])
    }
  }

  const fetchStudentDetail = async () => {
    const res: any = await getStudent('students', id)
    setStudent(res.data)
    await fetchReports(res.data.id)
    setLoading(false)
  }

  const launchGradeReport = (reportId: string) => {
    setOpenDialog(true)
    seReportId(reportId)
  }

  const fetchReports = async (id: string) => {
    const res: any = await fetchStudentReports(id)
    const flatRes = Object.values(res)
    setReports(flatRes)
  }

  const gradeReport = async () => {
    if (!grade) {
      toast.error('Please select a grade')
      return
    }
    setSubmitting(true)
    await updateReportMtn.mutateAsync()
  }

  const updateReportMtn = useMutation({
    mutationFn: async () => {
      try {
        const res = await updateDoc('reports', reportId, { grade })

        if (!res) {
          toast.error('Network error; please try again later')
          return
        }
        toast.success('Report updated')

        console.log('Response:', res)
        fetchReports(student.id)
        setOpenDialog(false)
        return res
      } catch (error) {
        console.error('Error updating report:', error)
        toast.error('An error occurred while updating; please try again later')
      } finally {
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    fetchStudentDetail()
  }, [])

  return (
    <div className="p-8">
      <h1 className="font-semibold text-[1.5rem]">Student Profile</h1>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-between mt-4 p-8 w-full mb-8  bg-[url(/images/profile-bg.png)] bg-cover bg-no-repeat bg-center">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>

          <div>
            <h3 className="font-semibold text-[1.2rem] text-white">
              {student?.firstName} {student?.lastName}
            </h3>
            <p className="text-sm text-white">{student?.course}</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gray-light-2 text-black-2">Assigned Siwes</Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-lg max-h-[90vh] overflow-auto bg-white">
            <DialogHeader>
              <DialogTitle>Assign Company</DialogTitle>
              <DialogDescription>Assign company to a student</DialogDescription>
            </DialogHeader>

            <AssignCompany studentId={student?.id} />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3 className="font-medium text-[1.2rem]">Basic Information</h3>
        <p className="text-sm">Student Basic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">First Name</Label>
            <Input
              value={student?.firstName || ''}
              readOnly
              placeholder="Enter First Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Last Name</Label>
            <Input
              value={student?.lastName || ''}
              readOnly
              placeholder="Enter Last Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Middle Name</Label>
            <Input
              value={student?.middleName || ''}
              readOnly
              placeholder="Enter Middle Name"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div className="relative">
            <Label className="mt-3 block">Email</Label>
            <Input
              value={student?.email || ''}
              readOnly
              placeholder="Enter Email"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Phone</Label>
            <Input
              value={student?.phone || ''}
              readOnly
              placeholder="Enter Phone"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block"> Location</Label>
            <Input
              value={student?.homeAddress || ''}
              readOnly
              placeholder="Enter Location"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem]">Academic Information</h3>
        <p className="text-sm">Student Academic Information</p>

        <div className="grid grid-cols-3 gap-4 mb-8 mt-4">
          <div>
            <Label className="mt-3 block">Matric No</Label>
            <Input
              value={student?.matricNo || ''}
              readOnly
              placeholder="Enter CGPA"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">CGPA</Label>
            <Input
              value={student?.cgpa || ''}
              readOnly
              placeholder="Enter CGPA"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Department</Label>
            <Input
              value={student?.course || ''}
              readOnly
              placeholder="Enter CDepartmentGPA"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>

          <div>
            <Label className="mt-3 block">Level</Label>
            <Input
              value={student?.level || ''}
              readOnly
              placeholder="Enter CGPA"
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF]"
            />
          </div>
        </div>

        <h3 className="font-medium text-[1.2rem]">Siwes Form</h3>
        <p className="text-sm">Upload Student Siwes Form</p>

        {!siwesForm && (
          <div className="mt-4">
            <Input
              type="file"
              onChange={selectFile}
              className="bg-white/40 backdrop-blur-[70px] placeholder:text-gray-light-5 mb-1 border-[1px] border-[#B3FAFF] w-fit"
            />
          </div>
        )}

        {siwesForm && <p>{siwesForm.name}</p>}

        <h3 className="font-medium text-[1.2rem] mt-8">Siwes Reports</h3>
        <p className="text-sm">All supervisors reports</p>

        <div className="mt-4">
          {reports.map((report, index) => (
            <div
              key={index}
              className="flex gap-4 border-[1px] border-gray-light-2 rounded-[8px] p-4 mb-2"
            >
              <div className="p-3 rounded-full grid place-content-center bg-primary text-white w-[40px] h-[40px]">
                <MessageSquareText></MessageSquareText>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <h4 className="font-medium">Report {index + 1}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <EllipsisVertical className="text-primary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white border-none">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => launchGradeReport(report[0].id)}
                        >
                          <Edit2 />
                          <span>Grade Report</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-gray-dark-3">
                  By {report[0].student.firstName + '' + report[0].student.lastName}{' '}
                  {format(new Date(report[0].createdAt), 'MMM dd, yyyy')}
                </p>

                {report.map((reportItem) => (
                  <>
                    <div key={reportItem.id} className="mt-3">
                      <p className="text-primary">Details</p>
                      <p className="text-gray-dark-3">{reportItem.details}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-primary">Remark</p>
                      <p className="text-gray-dark-3">{reportItem.remark}</p>
                    </div>
                  </>
                ))}
                <div className="mt-3">
                  <p className="text-primary">Grade</p>
                  <p className="text-gray-dark-3">
                    {report[0].grade ? report[0].grade : 'Not graded yet'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white rounded-lg gap-2">
            <DialogTitle className="text-[#0B7077] font-normal">Grade Report</DialogTitle>
            <DialogDescription className="text-[#8E8E93]">Select Grade</DialogDescription>
            <div className="grid gap-4 text-center">
              <Select onValueChange={(value) => setGrade(value)}>
                <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-full">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="grid grid-cols-4 gap-1">
              <DialogClose className="col-start-2 text-xs bg-white text-[#48484A] border-0">
                Cancel
              </DialogClose>
              <button
                disabled={submitting}
                onClick={gradeReport}
                className="w-full flex disabled:opacity-50 items-center col-span-2 rounded p-2 text-xs bg-[#0B7077] text-white text-center"
              >
                <div className="flex m-auto">
                  <span>Submit</span> {submitting && <Spinner className="ms-1 h-4" />}
                </div>
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
