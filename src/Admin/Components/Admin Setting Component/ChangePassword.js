import { message } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { reset, updatePassword } from "../../../API/Auth/authSlice"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {

    const [oldview,oldsetView] = useState(false)
    const [newview,newsetView] = useState(false)
    const [confirmview,confirmsetView] = useState(false)
    const [error, seterror] = useState(false)
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        passwordCurrent: '',
        password: '',
        confirmPassword: ''
      })
    
      const {  passwordCurrent, password, confirmPassword } = formData

    const oldpasswordvisible = () => {
        if(oldview === false){
            return oldsetView(true)
        }
        else{
            return oldsetView(false)
        }
    }
    const newpasswordvisible = () => {
        if(newview === false){
            return newsetView(true)
        }
        else{
            return newsetView(false)
        }
    }
    const confirmpasswordvisible = () => {
        if(confirmview === false){
            return confirmsetView(true)
        }
        else{
            return confirmsetView(false)
        }
    }
    const { user, isError, isSuccess, messages } = useSelector(
        (state) => state.auth
      )
    useEffect(() => {
        if (isError) {
            message.error(messages)
        }
        if (isSuccess) {
            message.success("Password updated Successfuly")
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, messages, dispatch])

    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()

        if(passwordCurrent.length === 0 && password.length === 0 && confirmPassword.length === 0){
            seterror(true)
        }



        if(passwordCurrent && password && confirmPassword){

    
            if(password === confirmPassword){
                const userData = {
                    passwordCurrent,
                    password
                }

                dispatch(updatePassword(userData))
                setFormData({
                    passwordCurrent: '',
                    password: '',
                    confirmPassword:''
                })
            }
        }
      }

    return(
        <div className="flex flex-col w-full mt-5 justify-center items-center">
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className=" font-semibold">Old Password:</label>
                        <div className="flex justify-end items-center">
                            <input className="cinput w-[500px]" type={`${oldview === false ? "password" : "text"}`} name="passwordCurrent" value={passwordCurrent} onChange={onChange}  placeholder="old password"/>
                            <i type="button " className=" absolute p-5 mt-2 " onClick={oldpasswordvisible}>{oldview === false ? <FaEyeSlash/> : <FaEye/> }</i>
                        </div>
                        <span className={`${error && passwordCurrent.length<=0 ? 'text-red-500': 'hidden'}`}>Please enter a current password</span>
                    </div>
                    <div className="flex flex-col">
                        <label className=" font-semibold">New Password:</label>
                        <div className="flex justify-end items-center">
                            <input className="cinput w-[500px]" type={`${newview === false ? "password" : "text"}`} name="password" value={password} onChange={onChange}  placeholder="New Password"/>
                            <i type="button " className=" absolute p-5 mt-2 " onClick={newpasswordvisible}>{newview === false ? <FaEyeSlash/> : <FaEye/> }</i>
                        </div>
                        <span className={`${error && password.length<=0 ? 'text-red-500': 'hidden'}`}>Please enter a new password</span>
                    </div>
                    <div className="flex flex-col">
                        <label className=" font-semibold">Confirm Password:</label>
                        <div className="flex justify-end items-center">
                            <input className="cinput w-[500px]" type={`${confirmview === false ? "password" : "text"}`} name="confirmPassword" value={confirmPassword} onChange={onChange}  placeholder="Confirm Password"/>
                            <i type="button " className=" absolute p-5 mt-2 " onClick={confirmpasswordvisible}>{confirmview === false ? <FaEyeSlash/> : <FaEye/> }</i>
                        </div>
                        <span className={`${error && confirmPassword.length<=0 ? 'text-red-500': 'hidden'}`}>Please enter a confirm password</span>
                        <span className={`${password !== confirmPassword ? 'text-red-500': 'hidden'}`}>Password don`t match!</span>
                    </div>
                    <div className="flex justify-end w-full">
                        <button className="bg-Secondary text-white w-[100px] py-2 px-5 rounded">Save</button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default ChangePassword