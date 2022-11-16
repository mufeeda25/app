import React from 'react'
import './message.css'
function Message({own}) {
  return (
    <div className={own? "message own": "message"}>
        <div className="messageTop">
            <img className='messageImg' src="https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=1024x1024&w=is&k=20&c=9Qfj9S124ojed7s4OWu3a3vbbMC76QYkqczg4L4M-Sc=" alt="" />
            <p className='messageText'>s been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    
        </div>
        <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message