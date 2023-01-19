import './ViewPost.css';
import React, { useState } from "react";
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library
// Run the query function once.

import {useEffect} from "react";

// Redirecting
import { useNavigate } from 'react-router-dom'

// Get defines HNN
import * as Defines from '../Defines.js'


function ViewPost(){
    let {PostID} = useParams()
    const [Post, setPost]= useState([]);

    const [authState, setAuthState] = useState({	
        username: "",	
        id: -1,	
        status: false,	
      });	

    useEffect(() => {
        getPost(PostID)
        console.log(Post)
        Axios
        .get(Defines.SERVER + "/Users/auth", {headers: {accessToken: localStorage.getItem("accessToken"),	}, })	
        .then((response) => {	
        if (response.data.error) {	
            setAuthState({ ...authState, status: false });	
        } else {	
            setAuthState({	
            username: response.data.username,	
            id: response.data.id,
            status: true,});	
            }	
        });	
        window.scrollTo(0, 0); // SCROLL UP HNN
    }, []);

    
    const getPost = (postid) => {
        Axios.post(Defines.SERVER + '/viewPosts', {ID: postid}).then((res) => {
            console.log(res.data);
            setPost(res.data);
        }).catch(() =>{
            console.log("it failed");
        })
    };
    

    //var Imgdirectory = "./server/images"
    let blnIsMyPost = false;

    const navigate = useNavigate(); // Redirecting

    // Ability to delete own post
    const deletePost = (e) => {
        Axios.post(Defines.SERVER + '/DeletePost', {ID: PostID})
            .then((res) => {
                navigate("/");

            }).catch((err) =>{
                alert("deletion error");
                console.log(err);
            });
    }

    if (Post.FinderID == authState.id){
                
        // Poster ID matches current user's ID
        blnIsMyPost = true;
    }

    // Format date and return HUMAN readable date HNN==========================
    const ConvertDateCreated = () => {
        let sqldatetime = Post.createdAt
        if (!sqldatetime){
            // On page load, Post.updatedAt will initially be undefined
            // if it is then return ""
            return ""
        }

        let temp = sqldatetime.toString().replace("T", " ");
        console.log(temp);

        return new Date(temp).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour12: true,
              hour: '2-digit',
              minute: '2-digit'
            }
      );
    }
    const ConvertDateUpdated = () => {

        let sqldatetime = Post.updatedAt
        if (!sqldatetime){
            // On page load, Post.updatedAt will initially be undefined
            // if it is then return ""
            return ""
        }

        let temp = sqldatetime.toString().replace("T", " ");
        console.log(temp);

        return new Date(temp).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour12: true,
              hour: '2-digit',
              minute: '2-digit'
            }
      );
    }
    //=========================================================================

    // Handle image popup HNN =================================================
    const [ImagePopup, setImagePopup] = useState(
        {
            Popup: false,
        }
    );

    const handleImageClick = (e) =>{
        let newState = !ImagePopup.Popup
        setImagePopup({...ImagePopup, Popup: newState});
    }
    //=========================================================================

    // HUMZA SECTION BELOW HERE ===============================================
    const createAnswer = (e) => 
    {
        alert(authState.username + authState.id)

        Axios.post(Defines.SERVER + '/createAnswer', {Sender: authState.username, Answer: e.Answer, PostID: PostID, PostTitle: Post.Title, OwnerOfPost: Post.FinderID}).
        then((res) => 
        {
            console.log(res.data);

            }).catch((err) =>
            
            {
                alert("it failed");
                console.log(err);
            });
        }
    
    const initialValues = {
        Answer: "",
    }

    const validationSchemaobj = Yup.object().shape(
        {
        Answer: Yup.string().required("Please answer the question."),
    })

    return(     
        <html className="bck">
        <div className = "viewpost-container">
            <div className='section1'>
                <div className='top-container'>{(Post.FoundItem)?
                    <div className='found-item-container'>
                        <div className='item-type-found'><h3 className='h3-item-type'>This item was found by a user.</h3></div>
                        <ul className='guidance'>
                            {/* <li>See if you recognize this item and it belongs to you.</li> */}
                            <li>Answer the question the Finder has about the item.</li>
                            <li>The Finder will message you about the return of your item.</li>
                            <li>Remember to always follow safe exchange practices.</li>
                        </ul>
                    </div>:
                    <div className='lost-item-container'>
                        <div className='item-type-lost'><h3 className='h3-item-type'>This item was lost by a user.</h3></div>
                        <ul className='guidance'>
                            {/* <li>See if you found an item that matches what's in this post.</li> */}
                            <li>Answer the question the Owner has about the item.</li>
                            <li>The Owner will message you about the return of their item.</li>
                            <li>Remember to always follow safe exchange practices.</li>
                        </ul>
                    </div>}
                </div>
            </div>
            
            <div className='content-container'>
                <div className="image-container">
                    <img
                    className="image-no-popup"
                    src = {process.env.PUBLIC_URL + (Post.Upload?"/userimages/":"/clipart/") + Post.ImageName}
                    onClick = {handleImageClick}
                    alt = "[User Image]"
                    />
                    {ImagePopup.Popup && (
                    <dialog
                        className="dialog"
                        style={{ position: "absolute" }}
                        open
                        onClick={handleImageClick}
                    >
                        <img
                        className="image"
                        src = {process.env.PUBLIC_URL + (Post.Upload?"/userimages/":"/clipart/") + Post.ImageName}
                        onClick = {handleImageClick}
                        alt = "[User Image]"
                        />
                    </dialog>
                    )}
                    <div className='time-container'>
                        <div className="time-posted">
                            <label>Posted: </label> 
                            {ConvertDateCreated()}
                        </div>

                        <div className="time-updated">
                            <label>Updated: </label> 
                            {ConvertDateUpdated()}
                        </div>
                    </div>
                </div>

                <div className = "info-container">
                    <div className="title">
                        <h1>{Post.Title}</h1>
                    </div>

                    <div className="clear-float"></div> {/* Not clearing float style after using it = huge problem HNN */}
                    
                    <div className="location">
                        <label>Location: </label>{Post.Country ? Post.Country : "n/a"}  {", "}{Post.Region ? Post.Region : "n/a"}
                    </div>

                    <div className="line-break"></div>
                    <br></br>
                    <div className="area">
                        <label>Area: </label> {Post.Area}
                    </div>
                    <div className="Description">
                        <label>Description: </label> 
                        <br></br>
                        {Post.Description}
                    </div>

                </div>
            </div>
            <div className="clear-float"></div> {/* Not clearing float style after using it = huge problem HNN */}

            <div className='bottom-container'>
                <h3>Verification Question</h3>
                <p>The Finder of the item wants to verify you are the owner. Please answer the following question below.</p>
            </div>

            <div className='question-container'>
                <div className="question">
                    <h4>{Post.Question1}</h4>
                </div>
                
                <Formik initialValues = {initialValues} onSubmit = {createAnswer} validationSchema = {validationSchemaobj}>
                <Form className="formContainer">
                    <ErrorMessage id="error" name="Answer" component="div"/>
                    <Field 
                    id="inputAnswer" 
                    name="Answer" 
                    placeholder="Enter the answer to the question."
                    />
                    <div>
                        <button id = "submit-button" type = "submit">Submit</button>
                    </div>
                </Form>
                </Formik>   
                
            </div>

            {
            (blnIsMyPost)?(<div className='manage-container'>
                <h5 id="label-mine">This is your post</h5>
                <button id = "delete-button" type = "button" onClick={deletePost}>Delete My Post</button>
                </div>):!null
            }

            
        </div>
        </html>   
    );

}

export default ViewPost