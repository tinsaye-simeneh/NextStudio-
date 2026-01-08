import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReloadData, hiddenloading, showloading } from "../../../../API/Server/rootSlice"
import { message } from "antd"
import {URL} from '../../../../Url/Url'
import JoditEditor from 'jodit-react';

const AdminAboutContent = () => {

    const { aboutData } = useSelector((state) => state.root)

    const [preview,setPreview] = useState(null)
    const [intro_image,setIntroImage] = useState('')
    const [about_desc,setAboutDesc] = useState('')
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const editor = useRef(null);

    useEffect(() => { 
        if (aboutData) {
            setIntroImage(aboutData.intro_image)
            // Handle both string and object formats for intro_image
            const imageUrl = typeof aboutData.intro_image === 'string' 
                ? aboutData.intro_image 
                : aboutData.intro_image?.url;
            setPreview(imageUrl || null)
            setAboutDesc(aboutData.about_desc || '')
        }
    },[aboutData])

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        
        transformFile(file)
    }

    

    const transformFile = (file) => {
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setIntroImage(reader.result);
                setPreview(reader.result)
            };
        }
    }
   
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
            dispatch(showloading())
            const {data} = await axios.patch(`${URL}/api/NextStudio/about`,{
                intro_image,
                about_desc
            },config)
            dispatch(hiddenloading())
            if(data.success === true){
                message.success('About content Updated Successfuly')
                dispatch(hiddenloading())
                dispatch(ReloadData(true))
            }
        }catch(err){
            dispatch(hiddenloading())
            message.error(err.message)
        }
    }



    return(
        <div className="flex flex-col gap-8">
            <div>
            <img className="w-full h-[400px] border-2 rounded object-cover " src={preview === null ? 'https://res.cloudinary.com/dtlrrlpag/image/upload/v1685707236/Next%20Studio/placeholder-image-gray-3x2_po4o0q.png' : preview}  alt=""/>
            </div>
            <div className="flex w-full items-center gap-5" >
                <div className="w-full ">
                    <form onSubmit={onSubmit}>
                        
                        <input className="cinput w-full mb-5" type="file" onChange={handleFileInputChange}  />
                        
                        <h1 className="text-xl font-bold uppercase text-center mb-5">Next Studio Description</h1>

                        <JoditEditor
                            ref={editor}
                            value={about_desc}
                            onChange={newContent => setAboutDesc(newContent)}     
                        />  

                        <div className="flex justify-end mt-5 gap-5 w-full">
                            <button type="submit" className="bg-Secondary text-white w-[150px] px-5 py-1 rounded">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminAboutContent;