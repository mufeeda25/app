import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import './messenger.css'
import { useState } from 'react'
import { SpaRounded } from '@material-ui/icons'
function Messenger() {
  const {user}=useContext(AuthContext);
  const [conversations,setConversations]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [message,setMessage]=useState([])
  useEffect(()=>{
  const  getConversations=async()=>{
     
      try{
        const res= await axios.get("/conversations/"+user._id);
        setConversations(res.data)
        
      
      }
      catch(err){
        console.log(err)
      }
    }
   getConversations()
  },[user._id])
  useEffect(()=>{

  })
console.log('jj',currentChat)
  return (
    <>
    <Topbar/>
      <div className='messenger'>
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input  placeholder='Search for friends' className="chatMenuInput" />
          {
            conversations.map((conv)=>(
              <div onClick={()=>setCurrentChat(conv)}>
              <Conversations conversation={conv} currentUser={user}/>
              </div>
            ))
          }
          
          
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat?
          <>
          <div className="chatBoxTop">
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message/>
            <Message own={true}/>
            <Message/>
            <Message own={true}/>
          </div>
          </>:
          <span className='noCurrentChat'>open a conversation to start a new chat</span>}
        <div className="chatBoxBottom">
          <textarea placeholder='write something' className='chatMessageInput'></textarea>
          <button className='chatSubmitButton'>Send</button>
        </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline/>
        </div>
      </div>
    </div>
    </>
  
  )
}

export default Messenger