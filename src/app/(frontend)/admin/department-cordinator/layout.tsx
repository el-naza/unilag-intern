import SideBar, { INavMenu } from "../_components/side-bar"
import ToolBar from "../_components/tool-bar"

export default function DepartmentCordinatorLayout({ children }: { children: React.ReactNode }) {
  const menuLinks: INavMenu[] = [
    {
      label: 'Home',
      route: '/admin/department-cordinator/home',
      iconName: 'Home',
    },
    {
      label: 'Students',
      route: '/admin/department-cordinator/students',
       iconName: 'GraduationCap'
    },
    {
      label: 'Report',
      route: '/admin/department-cordinator/report',
       iconName: 'FileText'
    },
    // {
    //   label: 'Departmental Admins',
    //   route: '/admin/department-cordinator/departmental-admins',
    //    iconName: 'Users'
    // },
  ]


  return (
    <div className='w-full h-[100vh] overflow-hidden'>
      <SideBar menuLinks={menuLinks} />
      <ToolBar />
      <main className='ml-[270px] mt-[72px] px-4 pt-4 pb-24 h-[100vh] overflow-y-auto bg-[#fafafa]'>{children}</main>
    </div>
  )
  }
  