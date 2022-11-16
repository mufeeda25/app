import React from 'react'
import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Feed from '../../components/feed/Feed.jsx'
import Rightbar from '../../components/rightbar/Rightbar.jsx';
function Home() {
  return (
    <><Topbar/>
    <div className="homeContainer">
    <Sidebar/> 
    <Feed/>
    <Rightbar/>
    </div>

   
    </>
  )
}

export default Home