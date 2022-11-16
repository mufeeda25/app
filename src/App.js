import Home from "./pages/home/Home";
import React from "react"
import Login from "./pages/login/Login";
import {BrowserRouter,Routes,Route, redirect} from "react-router-dom"
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from './pages/messenger/Messenger'

function App() {
  const {user}= useContext(AuthContext)
  
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      const script1 = document.createElement('script');
      script1.src = `https://www.googletagmanager.com/gtag/js?id=G-HHTT66KKYF`;
      script1.async = true;

      const script2 = document.createElement('script');
      script2.innerHTML = `
				window.dataLayer = window.dataLayer || [];
				function gtag(){
					dataLayer.push(arguments);
				}
				gtag('js', new Date());
				gtag('config', 'G-HHTT66KKYF');
			`;
      document.body.appendChild(script1);
      document.body.appendChild(script2);
    }
  }, []);
  return (
    <BrowserRouter>
    <Routes>
      <Route  path="/" element={user?<Home/>:<Register/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={user? redirect("/"):<Register/>}/>
      <Route path="profile/:username" element={<Profile/>}/>
      <Route path="/messenger" element={!user? redirect("/") :<Messenger/>}/>
    </Routes>
    </BrowserRouter>
    
     
    
  );
}

export default App;
