import { Tabs } from "antd";
import ScreenError from "./ScreenError";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reset } from "../../API/Auth/authSlice";
import Sidebar from "../Components/Sidebar Components/Sidebar";
import ChangePassword from "../Components/Admin Setting Component/ChangePassword";

const AdminSettingPage = () => {

    useEffect(() => {
        document.title = "Admin Setting - Bimer Business Group"
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
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
            {!show ? <ScreenError/> : <div>
             <div className="flex">
                    <Sidebar/>
                    <div className="flex flex-col w-full px-20 py-10 ml-[260px]">
                        <Tabs  defaultActiveKey="1">
                            <TabPane tab='Change Password' key="1">
                                <ChangePassword/>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
        </div>}
        </div>
    )
}

export default AdminSettingPage;