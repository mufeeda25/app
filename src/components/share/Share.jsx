import React,{useRef,useState} from 'react'
import './share.css';
import {PermMedia,Label,Room,EmojiEmotions, Cancel} from '@material-ui/icons'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file,setFile]=useState(null)
    const {user}= useContext(AuthContext)
    const desc=useRef()
    const submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data=new FormData();
            const fileName= Date.now()+file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.img=fileName
            try{
await axios.post("/upload",data )
            }
            catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post("/posts",newPost)
            window.location.reload();
        }
        catch(err){
            
        }
    }
  return (
    <div className='share'>
        <div className="shareWrapper">
            <div className="shareTop">
                <img src={`${PF}person/person1.png`} alt="" className="shareProfileImg" />
                <input placeholder={"what's in your mind "+ user.username +"?" }className="shareInput" ref={desc}/>
            </div>
            <hr  className='shareHr'/>
            {file&&(
                <div className='shareImgContainer'>
                    <img src={URL.createObjectURL(file)} className="shareImg" alt="" />
                    <Cancel className='shareCancelImg' onClick={()=>setFile(null)} />
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                        <PermMedia className='shareIcon' htmlColor='tomato'/>
                        <span className="shareOptionText">Photo or Video</span>
                        <input style={{display:"none"}} type="file" accept='.png,.jpeg,.jpg' id="file" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label htmlColor='red' className='shareIcon'/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room className='shareIcon' htmlColor='green'/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share