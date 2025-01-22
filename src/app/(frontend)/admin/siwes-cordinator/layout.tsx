import SideBar, { INavMenu } from "../_components/side-bar"
import ToolBar from "../_components/tool-bar"


export default function SiwesCordinatorLayout({ children }: { children: React.ReactNode }) {

  const menuLinks: INavMenu[] = [
    {
      label: 'Home',
      route: '/admin/siwes-cordinator/home',
      iconName: 'Home',
    },
    {
      label: 'Students',
      route: '/admin/siwes-cordinator/students',
       iconName: 'GraduationCap'
    },
    {
      label: 'Companies',
      route: '/admin/siwes-cordinator/companies',
       iconName: 'Building'
    },
    {
      label: 'Report',
      route: '/admin/siwes-cordinator/report',
       iconName: 'FileText'
    },
    {
      label: 'Activity',
      route: '/admin/siwes-cordinator/activity',
       iconName: 'Activity'
    },
    {
      label: 'Departmental Admins',
      route: '/admin/siwes-cordinator/departmental-admins',
       iconName: 'Users'
    },
  ]


  return (
    <div className='w-full h-[100vh] overflow-hidden'>
      <SideBar menuLinks={menuLinks} />
      <ToolBar />
      <main className='ml-[270px] mt-[72px] px-4 pt-4 pb-24 h-[100vh] overflow-y-auto bg-[#fafafa]'>{children}</main>
    </div>
  )
}
