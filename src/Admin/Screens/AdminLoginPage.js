import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";
import { login, reset } from '../../API/Auth/authSlice'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

const AdminLoginPage = () => {

    useEffect(() => {
        document.title = "Admin Login - Next Studio"
    })
    const [formData, setFormData] = useState({
        username: '',
        password: '',
      })

    
      const { username, password } = formData
    
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const [view,setView] = useState(false)
      const [error, seterror] = useState(false)
      const passwordvisible = () => {
          if(view === false){
              return setView(true)
          }
          else{
              return setView(false)
          }
      }
    
      const { user, isError, isSuccess, messages } = useSelector(
        (state) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
            message.error(messages)
        }
    
        if (isSuccess || user) {
          
          navigate('/admindashboard/home')
        }
    
        dispatch(reset())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [user, isError, isSuccess, messages, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()

        if(username.length === 0 && password.length ===0){
            seterror(true)
        }
        if(username && password){
        const userData = {
          username,
          password,
        }
    
        dispatch(login(userData))
      }
      }


    return(
        <div className="flex flex-col h-screen justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-[320px] gap-5">
                <div className="w-[180px] sm:w-[20vh]">
                    <img src="https://res.cloudinary.com/dtlrrlpag/image/upload/v1671362225/Next%20Studio/Logo/Next_Studio_Logo_ygxexg.png" alt="Logo" />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <input className="cinput w-[297px]" type="text" placeholder="Username" name="username" value={username} onChange={onChange}/>
                            <span className={`${error && username.length<=0 ? 'text-red-500': 'hidden'}`}>Please enter a username</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex justify-end items-center">
                                <input className="cinput w-[300px]" type={`${view === false ? "password" : "text"}`} placeholder="Password" value={password} name="password" id="password" onChange={onChange}/>
                                <i type="button " className=" absolute p-3 mt-2 " onClick={passwordvisible}>{view === false ? <FaEyeSlash/> : <FaEye/> }</i>
                            </div>
                            <span className={`${error && password.length<=0 ? 'text-red-500': 'hidden'}`}>Please enter a password</span>
                        </div>
                        <button type="submit" className='cbutton w-[297px]' >Login</button>
                    </div>
                </form>
        </div>
      
    </div>
    )
}

export default AdminLoginPage;