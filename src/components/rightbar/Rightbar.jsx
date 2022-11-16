import React from 'react'
import './rightbar.css';
import {Users} from '../../dummyData'
import Online from '../online/Online';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@material-ui/icons';
function Rightbar({user}) {
  
  const [friends,setFriends]=useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser,dispatch}=useContext(AuthContext)
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id)
  );
  useEffect(()=>{
    const getFriends=async()=>{
      try{
      const friendList=  await axios.get("/users/friends/"+user._id);
      setFriends(friendList.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[user])
  const handleClick=async()=>{
try{
  if(followed){
await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
dispatch({type:"UNFOLLOW",payload:user._id})
  }

  else{
    await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
    dispatch({type:"FOLLOW",payload:user._id})
  }
}
catch(err){
  console.log(err)
}
setFollowed(!followed)
  }
  const HomeRightbar=()=>{
    
    return(
      <>
        <div className="birthdayContainer">
          {/* <img src={`${PF}gift.png`} alt="" className="birthdayImage" /> */}
<span className='birthdayText'><b>pola</b> and <b>3 others</b> have a birthday  today.</span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
       {Users.map(u=>(
        <Online key={u.id} user={u}/>
       ))}
        
        </ul></>
    )
  }
  const ProfileRightbar=()=>{
    
    return(
      <>
      {user.username!==currentUser.username&&
      (<button className="rightbarFollowButton" onClick={handleClick}>
        {followed ? "Unfollow" : "Follow"}
        {followed? <Remove/> :<Add/>}
       
      </button>
      )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <div className="rightbarInfoKey">City : </div>
          <div className="rightbarInfoValue">{user.city}</div>
          </div>
          <div className="rightbarInfoItem">
          <div className="rightbarInfoKey">From :</div>
          <div className="rightbarInfoValue">{user.from}</div>
          </div>
          <div className="rightbarInfoItem">
          <div className="rightbarInfoKey">Relationship:</div>
          <div className="rightbarInfoValue">{user.relationship===1?"single":user.relationship===2?"married":"empty"}</div>
          </div>
          </div>
          <div className="rightbarTitle">
            <h4>Friends Following</h4>
            <div className="rightbarFollowings">
              {
                friends.map((friend,key)=>(
                  <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}} >
                  <div className="rightbarFollowing" >
                  <img src={friend.profilePicture? PF+friend.profilePicture:PF+"person/noAvatar.png"} className='rightbarFollowingImg' alt="" />
                  <span className='rightbarFollowingName'>{friend.username}</span>
                </div>
                </Link>
                )

          )
              }
            
              
            </div>
            </div></>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
      {user? <ProfileRightbar/>:<HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar