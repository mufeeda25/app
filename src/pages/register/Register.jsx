import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'
function Register() {
    const username=useRef()
      const email=useRef()  
      const password=useRef()  
      const passwordAgain=useRef()
      const navigate =useNavigate()
      const handleClick=async(e)=>{
        e.preventDefault();
if(passwordAgain.current.value!==password.current.value){
    password.current.setCustomValidity("password doesnt match");
}else{
    const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
        passwordAgain:passwordAgain.current.value,
    }
    try{
        await axios.post("/auth/register",user)
navigate("/login")
    }catch(err){
        console.log(err)
    }
}

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
                <input placeholder='Username'required ref={username} className='loginInput' />
                <input placeholder='Email' type="email" required ref={email} className='loginInput' />
                <input placeholder='Password' type="password" required ref={password} className='loginInput' />
                <input placeholder=' Confirm Password' type="password" required ref={passwordAgain} className='loginInput' />
                <button className="loginButton" type ="submit">Sign up</button>
                <span className='loginForgot'>Forgot Password?</span>
                <button className="loginRegisterButton">Log into Account</button>
            </form>
        </div>
    </div>
</div>  
  )
}

export default Register