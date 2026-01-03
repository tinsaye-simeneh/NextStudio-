import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaTrash } from "react-icons/fa";
import JoditEditor from "jodit-react";
import { ReloadData, hiddenloading, showloading } from "../../../API/Server/rootSlice";
import { Modal, message } from "antd";
import { URL } from "../../../Url/Url";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const AdminPortfolioManagement = () => {

    const { portfolioData } = useSelector((state) => state.root)

    const [showAddEditModal,setShowAddEditModal] = useState(false)
    const [selectedItemforEdit,setSelectedItemforEdit] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteID,setDeleteId] = useState(null)
    const [company_name,setCompanyName] = useState('')
    const [project_name,setProjectName] = useState('')
    const [project_category,setProjectCategory] = useState('')
    const [project_description1,setProjectDescription1] = useState('')
    const [project_date,setProjectDate] = useState('')
    const [project_video,setProjectVideo] = useState('')
    const [project_image,setProjectImage] = useState([])
    const [preview, setPreview] = useState([])
    const [newPreview,setNewPreview] = useState([])
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const editor = useRef(null);
    const query = useQuery()
    const page = query.get('page') || 1; 

    useEffect(() => {
        if(selectedItemforEdit){
            setCompanyName(selectedItemforEdit.company_name)
            setProjectName(selectedItemforEdit.project_name)
            setProjectCategory(selectedItemforEdit.project_category)
            setProjectVideo(selectedItemforEdit.project_video)
            setProjectDescription1(selectedItemforEdit.project_description1)
            setProjectDate(selectedItemforEdit.project_date)
            setProjectImage(selectedItemforEdit.project_image)
            setPreview(selectedItemforEdit.project_image)
        }
        else {
            setCompanyName('')
            setProjectName('')
            setProjectCategory('')
            setProjectDescription1('')
            setProjectDate('')
            setProjectVideo('')
            setProjectImage([])
            setPreview([])
        }
    },[selectedItemforEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
            dispatch(showloading())
            if(selectedItemforEdit){
                const {data} = await axios.patch(`${URL}/api/NextStudio/portfolio/`+ selectedItemforEdit._id,{
                    project_name,project_category,project_description1,project_date,project_image,project_video,company_name
                },config)
                dispatch(hiddenloading())
                if(data.success === true){
                    setShowAddEditModal(false)
                    setCompanyName('')
                    setProjectCategory('')
                    setProjectDescription1('')
                    setProjectDate('')
                    setProjectImage([])
                    setProjectName('')
                    setProjectVideo('')
                    setPreview([])
                    message.success('Portfolio Added Successfuly')
                    dispatch(hiddenloading())
                    dispatch(ReloadData(true))
                }
            }else{
                const {data} = await axios.post(`${URL}/api/NextStudio/portfolio`,{
                    project_name,project_category,project_description1,project_date,project_image,project_video,company_name
                },config)
                dispatch(hiddenloading())
                if(data.success === true){
                    setShowAddEditModal(false)
                    setCompanyName('')
                    setProjectCategory('')
                    setProjectDescription1('')
                    setProjectDate('')
                    setProjectImage([])
                    setProjectName('')
                    setProjectVideo('')
                    setPreview([])
                    message.success('Portfolio Added Successfuly')
                    dispatch(hiddenloading())
                    dispatch(ReloadData(true))
                }
            }
        }catch(err){
            dispatch(hiddenloading())
            message.error(err.response.data.messages)
        }
    }

    const handleImageChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];
    
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          // eslint-disable-next-line no-loop-func
          reader.onload = () => {
            if (reader.readyState === 2) {
              imagesArray.push(reader.result);
              setProjectImage(imagesArray);
              setPreview(imagesArray)
            }
          };
    
          reader.readAsDataURL(files[i]);
        }
      };
    
      const handleNewImageInput = (e) => {
        const files = e.target.files;
        const imagesArray = [];
    
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          // eslint-disable-next-line no-loop-func
          reader.onload = () => {
            if (reader.readyState === 2) {
              imagesArray.push(reader.result);
              setProjectImage(imagesArray);
              setNewPreview(imagesArray)
            }
          };
    
          reader.readAsDataURL(files[i]);
        }
      };


      const handleImageDelete = async (id) => {
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
            dispatch(showloading())
            const data = await axios.delete(`${URL}/api/NextStudio/portfolio/${selectedItemforEdit._id}/`+id ,config)
            dispatch(hiddenloading())
            if(data.data.success === true)
                setShowAddEditModal(false)
                message.success('Portfolio Delete Successfuly')
                dispatch(hiddenloading())
                dispatch(ReloadData(true))

        }catch(err){
            message.error(err.message)
        }
    }

    const handleNewImages = async (e) => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
            dispatch(showloading())
            if(selectedItemforEdit){
                const {data} = await axios.patch(`${URL}/api/NextStudio/portfolio/image/`+ selectedItemforEdit._id,{
                    project_image
                },config)
                dispatch(hiddenloading())
                if(data.success === true){
                    setShowAddEditModal(false)  
                    setProjectImage([])
                    setNewPreview([])
                    message.success('Portfolio Image Added Successfuly')
                    dispatch(hiddenloading())
                    dispatch(ReloadData(true))
                }
            }
        }catch(err){
            dispatch(hiddenloading())
            message.error(err.response.data.messages)
        }
    }


    const handleDelete = async (id) => {
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
            dispatch(showloading())
            const data = await axios.delete(`${URL}/api/NextStudio/portfolio/` + id,config)
            dispatch(hiddenloading())
            if(data.data.success === true)
                message.success('Portfolio Delete Successfuly')
                dispatch(hiddenloading())
                dispatch(ReloadData(true))

        }catch(err){
            message.error(err.message)
        }
    }


    return(
        <div>
            <div className="flex flex-col">
                <div className=" flex  justify-end"> 
                    <button className="bg-Secondary text-white w-[200px] py-2 px-5 rounded" onClick={() => {
                        setSelectedItemforEdit(null);
                        setShowAddEditModal(true)
                    }}>Add Work</button>
                </div>
                <hr className="mt-5 mb-5"/>
                <div className="flex flex-wrap justify-center items-center gap-5">
                    {portfolioData.map((data) => (
                        <div className="flex flex-col w-[300px] h-[460px] border-2 rounded-md">
                            <img className="h-[350px] object-cover rounded-t-md border-b-2 mx-auto w-full" src={data.project_image[0].url} alt="newImage"/>
                            <h1 className="text-xl h-[50px] ml-2 mr-2 mt-1 font-semibold text-center">{data.project_name}</h1>
                            <div className="flex mt-2 w-full">
                                <button className="w-1/2 bg-Secondary rounded-r-none rounded-t-none rounded-md p-3 text-white" onClick={() => {
                                    setSelectedItemforEdit(data);
                                    setShowAddEditModal(true)
                                }}>Update</button>
                                <button className="w-1/2 bg-red-600 rounded-md rounded-l-none rounded-t-none text-white p-3" onClick={() => {
                                    setDeleteId(data._id)
                                    setShowDeleteModal(true)
                                }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-5 ">
                       <Pagination page={page}/>
                </div>
            </div>
            <Modal visible={showAddEditModal}  footer={null} onCancel={() => {setShowAddEditModal(false); setSelectedItemforEdit(null)}}>
                <h1 className="text-center text-xl uppercase font-semibold mt-5">{selectedItemforEdit ? 'Update Work' : 'Add Work'}</h1>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <label className="font-bold mt-5">Company Name</label>
                <input className="cinput w-full" type="text" onChange={(e) => setCompanyName(e.target.value)} value={company_name}/>
                <label className="font-bold mt-5">Project Name</label>
                <input className="cinput w-full" type="text" onChange={(e) => setProjectName(e.target.value)} value={project_name}/>
                <label className="font-bold mt-5">Project Category</label>
                <input className="cinput w-full" type="text" onChange={(e) => setProjectCategory(e.target.value)} value={project_category}/>
                <label className="font-bold mt-5">Project Youtube Link</label>
                <input className="cinput w-full" type="url" onChange={(e) => setProjectVideo(e.target.value)} value={project_video}/>
                <label className="font-bold mt-5">Project Description</label>
                <JoditEditor
                    className="mt-3"
                    ref={editor}
                    value={project_description1}
                    onChange={newContent => setProjectDescription1(newContent)}     
                />
                <label className="font-bold mt-5">Project Date</label>
                <input className="cinput w-full" type="date" onChange={(e) => setProjectDate(e.target.value)} value={project_date}/>
                <label className={selectedItemforEdit ? 'hidden' :'font-bold mt-5 mb-3'}>Project Images</label>
                <input className={selectedItemforEdit ? 'hidden' :'cinput w-full'} type="file" multiple onChange={handleImageChange}/>
                <div className="flex justify-end mt-3 gap-5 w-full">
                        <button type="submit" className="bg-Secondary text-white w-[150px] px-5 py-1 rounded">{selectedItemforEdit ? 'Update Content' : 'Add'}</button>
                </div>
                </div>
            </form>
            <div className="flex flex-wrap gap-5 mt-5 justify-center items-center">
                    {preview.map((data) => (
                        <div className=" w-[200px] object-contain">
                            <img className="h-[135px] object-cover" src={selectedItemforEdit ? data.url : data} alt="pic"/>
                            <button className={selectedItemforEdit ? 'text-red-500 ml-[180px] -mt-[130px] absolute z-10' : 'hidden'} onClick={() => {
                                handleImageDelete(data._id)
                            }}><FaTrash/></button>
                        </div>
                    ))}
            </div>
            <div className={selectedItemforEdit ? "flex flex-wrap gap-5 mt-5 justify-center items-center" : "hidden"}>
                    {newPreview.map((data) => (
                        <div className=" w-[200px] object-contain">
                            <img className="h-[135px] object-cover" src={data} alt="pic"/>
                        </div>
                    ))}
            </div>
            <div className={selectedItemforEdit ? 'flex flex-col gap-2' : 'hidden'}>
                <form onSubmit={handleNewImages}>
                    <label className='font-bold mt-10 mb-3'>Project Images</label>
                    <input className='cinput w-full' type="file" multiple onChange={selectedItemforEdit ? handleNewImageInput : handleImageChange}/>
                    <div className="flex justify-end mt-3 gap-5 w-full">
                        <button type="submit" className="bg-Secondary text-white w-[150px] px-5 py-1 rounded">Add Image</button>
                    </div>
                </form>
            </div>    
            </Modal>
            <Modal visible={showDeleteModal} footer={null} closable={false} centered={true} onCancel={() => {setShowDeleteModal(false); setDeleteId(null)}}>
                    <h1 className="text-center text-2xl">Are you sure want to delete?</h1>
                    <div className="flex justify-center items-center gap-5 mt-5">
                        <button className="bg-Secondary w-[80px] p-1 rounded text-white" onClick={() => {handleDelete(deleteID); setShowDeleteModal(false)}}>Ok</button>
                        <button className="bg-red-500 w-[80px] p-1 rounded text-white" onClick={() => {
                            setShowDeleteModal(false) 
                            setDeleteId(null)
                        }}>Cancel</button>
                    </div>
            </Modal>
        </div>
    )
}

export default AdminPortfolioManagement;