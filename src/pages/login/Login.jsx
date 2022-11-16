import React,{useRef} from 'react'
import "./login.css"
import { loginCall } from '../../apiCalls'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress} from "@material-ui/core"
import { useNavigate } from 'react-router-dom'
function Login() {
    const email=useRef()
    const password=useRef()
    const navigate=useNavigate()
    const {user,isFetching,error,dispatch}= useContext(AuthContext)
    const handleClick=(e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch);
console.log(user)
navigate("/")
    }
    
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">SocialApp</h3>
                <span className='loginDesc'>Connect with Friends and the whole world.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder='Email'required ref={email} type="email" className='loginInput' />
                    <input placeholder='Password' minLength="5" required ref={password} type="password" className='loginInput' />
                    <button className="loginButton" disabled={isFetching} type="submit">{isFetching?<CircularProgress />:"Log In"}</button>
                    <span className='loginForgot'>Forgot Password?</span>
                    <button className="loginRegisterButton">{isFetching?<CircularProgress />:"Create a New Account"}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login