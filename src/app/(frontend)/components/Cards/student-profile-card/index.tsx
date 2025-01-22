
type StudentProfile = {
  name: string
  course: string
  cgpa: string
  image: string 
}

type StudentProfileCardProps = {
  student: StudentProfile
}

export default function StudentProfileCard({ student }: StudentProfileCardProps) {
  const { name, course, cgpa, image } = student

  return (
    <div
      className="relative h-[240px] w-[200px] text-white rounded-[4px] border overflow-hidden flex items-end"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '4px',
      }}
    >
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <div className="z-10 w-full text-white p-[8px]">
        <p className="font-[700] text-[14px] mb-[4px]">{name}</p>
        <div className="flex items-center justify-between font-[400] text-[12px]">
          <p>{course}</p>
          <p>{cgpa} CGPA</p>
        </div>
      </div>
    </div>
  )
}
