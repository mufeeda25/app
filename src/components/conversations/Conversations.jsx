import axios from 'axios'
import React from 'react'
import { useEffect,useState } from 'react'
import './conversations.css'
function Conversations({conversation,currentUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState({})
  useEffect(()=>{
    const friendId= conversation.members.find((m)=>(
      m!==currentUser._id
    ))
    const getUser=async()=>{
      try{
        const res= await axios.get("/users?userId="+friendId);
        setUser(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getUser()
  },[conversation,currentUser])
  return (
    <div className='conversation'>
        <img src={user.profilePicture?user.profilePicture:PF+"person/noAvatar.png"} alt="" className="conversationImg" />
        <span className='conversationName'>{user.username}</span>
    </div>
  )
}

export default Conversations