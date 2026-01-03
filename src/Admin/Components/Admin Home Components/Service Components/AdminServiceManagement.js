import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReloadData, hiddenloading, showloading } from "../../../../API/Server/rootSlice"
import { Modal, message } from "antd"
import JoditEditor from "jodit-react";
import {URL} from '../../../../Url/Url'

const AdminServiceManagement = () => {

    const { serviceData } = useSelector((state) => state.root)

    const [showAddEditModal,setShowAddEditModal] = useState(false)
    const [selectedItemforEdit,setSelectedItemforEdit] = useState(null)
    const [service_title,setServiceTitle] = useState('')
    const [service_description,setServiceDescription] = useState('')
    const [service_icon,setServiceIcon] = useState(null)
    const [preview,setPreview] = useState(null)
    const editor = useRef(null);
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        
        transformFile(file)
    }

    const transformFile = (file) => {
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setServiceIcon(reader.result);
                setPreview(reader.result)
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
            const {data} = await axios.patch(`${URL}/api/NextStudio/service/` + selectedItemforEdit._id,{
                service_icon,service_title,service_description
            },config)
            dispatch(hiddenloading())
            if(data.success === true){
                setShowAddEditModal(false)
                setServiceIcon(null)
                setServiceTitle("")
                setServiceDescription("")
                setPreview(null)
                message.success('Services Updated Successfuly')
                dispatch(hiddenloading())
                dispatch(ReloadData(true))
            }
        }catch(err){
            dispatch(hiddenloading())
            message.error(err.message)
        }
    } 

    useEffect(() => {
        if(selectedItemforEdit){
            setServiceIcon(selectedItemforEdit.service_icon)
            setServiceTitle(selectedItemforEdit.service_title)
            setServiceDescription(selectedItemforEdit.service_description)
            setPreview(selectedItemforEdit.service_icon.url)
        }else{
            setPreview('')
            setServiceTitle('')
            setServiceIcon('')
            setServiceDescription('')
        }
    },[selectedItemforEdit])
    

    return(
        <div>
            <div className="flex flex-col">
                <div className="flex flex-wrap justify-center items-center gap-10">
                    {serviceData.map((data) => (
                        <div className="w-[285px] h-[385px] border-2 rounded-md">
                            <img className=" border-b-2 rounded-md" src={data.service_icon.url} alt="services icon"/>
                            <h1 className="text-lg mt-5 font-bold text-center">{data.service_title}</h1>
                            <button className="w-full p-2 rounded-md mt-3 text-white rounded-t-none bg-Secondary" onClick={() => {
                                setSelectedItemforEdit(data)
                                setShowAddEditModal(true)}}>Update</button>
                        </div>
                    ))}
                </div>
            </div>
            <Modal visible={showAddEditModal}  footer={null} onCancel={() => {setShowAddEditModal(false); setSelectedItemforEdit(null)}}>
                <h1 className="text-center text-xl uppercase font-semibold mt-5 mb-5">Edit Services</h1>
                <div className="w-full h-[200px] flex justify-center items-center">
                <img className=" h-[180px] object-cover border-2 rounded-md"  src={preview === null ? 'https://res.cloudinary.com/dtlrrlpag/image/upload/v1685707236/Next%20Studio/placeholder-image-gray-3x2_po4o0q.png' : preview}  alt=""/>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="font-bold mt-5">Service Icon:</label>
                    <input className="cinput w-full" type="file" accept="image/gif" onChange={handleFileInputChange} />
                    <label className="font-bold mt-5">Service Title:</label>
                    <input className="cinput w-full" onChange={(e) => setServiceTitle(e.target.value)} value={service_title} />
                    <label className="font-bold">Service Description:</label>
                    <JoditEditor
                    ref={editor}
                    value={service_description}
                    onChange={newContent => setServiceDescription(newContent)}     
                    />
                    <div className="flex justify-end mt-3 gap-5 w-full">
                        <button type="submit" className="bg-Secondary text-white w-[150px] px-5 py-1 rounded">Update</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default AdminServiceManagement;