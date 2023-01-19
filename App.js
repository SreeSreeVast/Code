import './App.css';
import {BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom'
import PostPage from './Pages/PostPage';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import MessagePage from './Pages/MessagePage';
import ViewPost from './Pages/ViewPost';
import Inbox from './Pages/InboxPage';
import Registration from "./Pages/Registration";	
import Login from "./Pages/Login";	
import MyPosts from "./Pages/MyPostsPage";
import AnswersPage from './Pages/AnswersPage';
import { useNavigate } from "react-router-dom";	
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";	
import axios from "axios";

import * as Defines from './Defines.js'

// Logo, fix bug where logo would not render in certain pages... HNN
import logo1 from './Images/LostAndFoundLogo1.png'
import logo2 from './Images/LostAndFoundLogo2.png'

import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library


function App() {
	const [LogoHover, setLogoHover] = useState(false);

	const [authState, setAuthState] = useState({	
		username: "",	
		id: 0,	
		status: false,	
	  });	
	  useEffect(() => {	
		axios	
		  .get(Defines.SERVER + "/Users/auth", {	
			headers: {	
			  accessToken: localStorage.getItem("accessToken"),	
			},	
		  })	
		  .then((response) => {	
			if (response.data.error) {	
			  setAuthState({ ...authState, status: false });	
			} else {	
			  setAuthState({	
				username: response.data.username,	
				id: response.data.id,
				status: true,	
          });	
        }	
      });	
  }, []);	
  const logout = () => {	
    localStorage.removeItem("accessToken");	
    setAuthState({ username: "", id: 0, status: false });	
  };

  const hover = () =>{
	setLogoHover(true);
  };

  const notHover = () =>{
	setLogoHover(false);
}


	// Note in react-router-dom v6, switches are now simply called "Routes" HNN
  	return (
		<div className="App">
		<AuthContext.Provider value={{ authState, setAuthState }}>
		  <BrowserRouter>
			<div className="navigation-bar">
				{/*Start of navigation bar*/}
			  	<div className="navigationElements">
					<div onMouseEnter={hover} onMouseLeave={notHover}>
				  	<NavLink className={({ isActive }) => (isActive ? 'logo-container-active' : 'logo-container-inactive')} to="/"><img className="logo-image" src={LogoHover?logo2:logo1} alt="Site Logo"/></NavLink>
					</div>
					{!authState.status ? (
					<>
						<NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Login</NavLink>
						<NavLink to="/registration" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Registration</NavLink>
						<NavLink to="/Search" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Search</NavLink>
					</>
					) : (
					<>
						<NavLink to="/Search" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Search</NavLink>
						<NavLink to="/CreatePost" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>Post</NavLink>
						<NavLink to="/Message" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Messages</NavLink>
						<NavLink to="/Inbox" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Inbox</NavLink>
						<NavLink to="/AnswersPage" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}> Answers</NavLink>
						
					</>
					)}


					<div className="logged-in-container">
						{authState.status && <button onClick={logout} className="logout-button"> Logout</button>}
					</div>
					<NavLink to="/MyPosts" className={({ isActive }) => (isActive ? 'logged-in-username-active' : 'logged-in-username-inactive')}><h1 className="logged-in-header">{authState.username}</h1></NavLink>

			  	</div>

				{/*End of navigation bar*/}
			</div>
			
			<Routes>
			  <Route path="/" element={<HomePage />} />
			  <Route path="registration" element={<Registration />} />
			  <Route path="login" element={<Login/>} />
			  <Route path="CreatePost" element={<PostPage />}/>
			  <Route path="Post/:PostID" element={<ViewPost />}/>
			  <Route path="Message" element={<MessagePage />}/>
			  <Route path="Search" element={<SearchPage />}/>
			  <Route path="MyPosts" element={<MyPosts />}/>
			  <Route path="Inbox" element={<Inbox />}/>
			  <Route path="AnswersPage" element={<AnswersPage />}/>
			</Routes>
		  </BrowserRouter>
		</AuthContext.Provider>
	  </div>
  

  	);

}

export default App;
