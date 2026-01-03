import { message } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {URL} from '../../../../Url/Url'
import { ReloadData, hiddenloading, showloading } from "../../../../API/Server/rootSlice"

const AdminVideoManagement = () => {

    const { videoBannerData } = useSelector((state) => state.root)

    const [banner_video,setBannerVideo] = useState('')
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    
    useEffect(() => {
        setBannerVideo(videoBannerData.banner_video)
       
    },[videoBannerData])

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        
        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setBannerVideo(reader.result);
            };
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
            dispatch(showloading())
            const {data} = await axios.patch(`${URL}/api/NextStudio/video-banner`,{banner_video},config)
                
                if(data.success === true){
                    dispatch(showloading())
                    setBannerVideo('');
                    dispatch(ReloadData(true))
                    dispatch(hiddenloading())
                    message.success('Video Updated Successfully')
                }
                
        }catch(err){
                    message.error(err.message)
        }
    }


    return(
        <div className="w-full flex flex-col">
            <div>
                <video className="w-full" autoPlay controls muted>
                    <source src={videoBannerData.banner_video.url} alt="new-video"/>
                </video>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <input type="file" className="cinput w-full" accept="image/mp4" onChange={handleFileInputChange}/>
                    <div className="flex mt-5 justify-end w-full">
                        <button type="submit" className="bg-Secondary text-white w-[100px] py-2 px-5 rounded">Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AdminVideoManagement;