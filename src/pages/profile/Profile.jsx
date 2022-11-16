import React,{useState,useEffect} from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx';
import axios  from 'axios'
import {useParams} from 'react-router'
function Profile() {
  const [user,setUser]=useState({})
  const username=useParams().username;
  
  useEffect(()=>{
    const fetchUser=async()=>{
const result= await axios.get(`/users?username=${username}`)
console.log("datajjjj",result)
setUser(result.data)
console.log("123",user)
    }
    fetchUser()
  },[username])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <><Topbar/>
    <div className="profile">
    <Sidebar/> 
    <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img src={user.coverPicture?user.coverPicture:PF+"person/noCover.png"} className='profileCoverImg' alt="" />
            <img src={user.profilePicture?user.profilePicture: PF+"person/noAvatar.png"} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
                <h4 className='profileInfoName'>{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          
        </div>
        <div className="profileRightBottom">
        <Feed username={username}/>
    <Rightbar user={user}/>
        </div>
    </div>
   
    </div>

   
    </>
  )
}

export default Profile