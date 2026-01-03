import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { reset } from "../../API/Auth/authSlice"
import Sidebar from "../Components/Sidebar Components/Sidebar"
import ScreenError from "./ScreenError"
import { Tabs } from "antd"
import TabPane from "antd/es/tabs/TabPane"
import AdminAboutContent from "../Components/Admin About Components/About Components/AdminAboutContent"
import AdminClientManagement from "../Components/Admin About Components/Client Components/AdminClientManagement"
import AdminTeamManagement from "../Components/Admin About Components/Team Components/AdminTeamManagement"

const AdminAboutPage = () => {

    const { aboutData } = useSelector((state) =>  state.root)

    useEffect(() => {
        document.title = "Admin About Page Management - Next Studio"
    })

    const [show,setShow] = useState(true)

    const ScreenSize = () => {
        if(window.innerWidth <= 1080){
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    useEffect(() => {
        ScreenSize()
        window.addEventListener('resize',() => {ScreenSize()})
    },[])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    
    useEffect(() => {
    
        if (!user) {
          navigate('/administrator')
        }
    
        return () => {
          dispatch(reset())
        }
      }, [user, navigate, dispatch])


    return(
        <div>
            {!show ? <ScreenError/> : <div className="flex">
                <Sidebar/>
                {aboutData && (
                    <div className="flex flex-col w-full px-20 py-10 ml-[260px]">
                        <Tabs  defaultActiveKey="1">
                            <TabPane tab='About Content' key="1">
                                <AdminAboutContent/>
                            </TabPane>
                            <TabPane tab='Team' key="2">
                                <AdminTeamManagement/>
                            </TabPane>
                            <TabPane tab='Client' key="3">
                                <AdminClientManagement/> 
                            </TabPane>
                        </Tabs>
                    </div>   
               )}
            </div>}
        </div>
    )
}

export default AdminAboutPage;