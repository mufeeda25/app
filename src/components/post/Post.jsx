import React from 'react'
import './post.css'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'

import {MoreVert,FavoriteBorder} from '@material-ui/icons'
import { useState,useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Post({post}) {
   const [like,setLike]=useState(post.likes.length) ;
   const[isLiked,setIsLiked]=useState(false);
   const [user,setUser]=useState({});
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const {user:currentUser}=useContext(AuthContext)
   useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
   },[post.likes,currentUser._id])
   useEffect(()=>{
    const fetchUser=async()=>{
const result= await axios.get(`/users?userId=${post.userId}`)
console.log(result)
setUser(result.data)
    }
    fetchUser()
  },[post.userId ])
   const likeHandler=()=>{
    try{
  axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})

    }
    catch(err){
console.log(err)
    }
    setLike(isLiked?like-1:like+1);
    setIsLiked(!isLiked)
   }

  return (
    <div className='post'>
        <div className="postWrapper">
<div className="postTop">
    <div className="postTopLeft">
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture? PF+user.profilePicture: PF+"person/noAvatar.png"} alt="" className="postProfileImg"  />
        </Link>
        
       
        <span className="postUsername">{user.username}</span>
        <span className='postDate'>{format(post.createdAt)}</span>
    </div>
    <div className="postTopRight">
        <MoreVert/>
    </div>
</div>
<div className="postCenter">
    <span className='postText'> {post?.desc}</span>
    <img src={PF+post.img} className='postImg' alt="" />
</div>
<div className="postBottom">
    <div className="postBottomLeft">
        <img src={`${PF}like.png`} alt="" onClick={likeHandler} className="likeIcon" />
        <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler} />
        <span className='postLikeCounter'>{like} people like it</span>
    </div>
    <div className="posBottomRight">
        <span className="postCommentText">{post.comment} comments</span>
    </div>
</div>
    </div>
</div>
  )
}

export default Post