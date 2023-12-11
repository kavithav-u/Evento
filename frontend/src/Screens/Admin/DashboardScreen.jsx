import Sidebar from '../../components/Admin/Sidebar'
import AdminHeader from '../../components/Admin/AdminHeader'
import DashboardCards from '../../components/Admin/DashboardCards'
import Graph from '../../components/Admin/Graph'

const DashboardScreen = () => {

  return (
<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
    <Sidebar />
    <div className="flex flex-col flex-1">
        <AdminHeader />
        <div className="flex-1  min-h-0 overflow-auto mt-10">
            <DashboardCards/>  
            <div className='bg-stone-200 w-full p-10'>
            <div className='sm:w-5/5 md:w-3/5 mx-auto mt-9 '>
            <Graph />  
            </div>
            </div>
        </div>
    </div>
</div>  )
}

export default DashboardScreen