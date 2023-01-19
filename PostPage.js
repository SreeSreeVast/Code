import './PostPage.css';
import React, { useState } from "react";
import Axios from 'axios'
// Allows creation of forms without using traditional HTML tags (MUCH FASTER)
// Handles all the tedious part of form validation
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library

import { useNavigate } from 'react-router-dom'

// Get userID 
import {useEffect} from "react";

// Get defines HNN
import * as Defines from '../Defines.js'

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

// Import image icon
import uploadIcon from '../Images/UploadIcon.png'

const PostPage = () => {
	
	const [authState, setAuthState] = useState({	
		username: "",	
		id: -1,	
		status: false,	
	  });	
	// get userid once at start of page
	useEffect(() => {	
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
	}, []);	

	const [newPost, setNewPost] = useState(
		{
				//Title: '',
				//Description: '',
				//Location: '',
				//Question1: '',
				//Answer1: '',
				Photo: '',
		}
	);

	// LOST VS FOUND RADIO BUTTONS ====================================================
	const [FoundRadioSelect, setLostRadioSelect] = useState(
		{
				found: true,
		}
	);


	// LOCATION SELECTION HANDLING HNN ====================================================

	// New country region selector
	const [LocationSelect, setLocationSelect] = useState(
		{
				country: '',
				region: '',
		}
	);


	const handleLocationCountry = (value) => {
		console.log("LOCATION COUNTRY: " + value) // Debug

		//const { name, value } = e.target;
		
		setLocationSelect(prevState => ({
			...prevState,
			country: value
		}));
		
	};

	const handleLocationRegion = (value) => {
		console.log("LOCATION REGION: " + value) // Debug

		//const { name, value } = e.target;
		
		setLocationSelect(prevState => ({
			...prevState,
			region: value
		}));
		
	};

	//=====================================================================================

	//PHOTO HANDLING ======================================================================

	const [SelectPhotoType, setSelectPhotoType] = useState(false); // Old way HNN
	const [UseClipArt, setUseClipArt] = useState(false);

	const handleImageTypeChange = (e) =>{
		//console.log("HANDLEIMAGECHANGE:" + e); //Debug use
		let blnFlip = !UseClipArt;
		setUseClipArt(blnFlip);
	}

	const [file, setFile] = React.useState(null);
	//=====================================================================================

	const navigate = useNavigate();

	const createPost = (e) => {
		//let FoundItem; // Debug HNN
		const formData = new FormData();

		// NOT USED ANYMORE HNN
		// if (e.checked) {
		// 	formData.append("FoundItem", 0);
		// 	//FoundItem = false;
		// }else {
		// 	formData.append("FoundItem", 1);
		// 	//FoundItem = true;
		// }

		//debug printouts
		console.log(e);
		console.log(e.clipart);

		//e.preventDefault();
		formData.append("Title", e.Title);
		formData.append("Description", e.Description);
		formData.append("Country", LocationSelect.country);
		formData.append("Region", LocationSelect.region);
		formData.append("Area", e.Area);
		formData.append("Question1",e.Question1);
		formData.append("Answer1", e.Answer1);
		formData.append("FinderID", authState.id);
		formData.append("Tags", e.Tags);
		formData.append("FoundItem", e.Type);
		formData.append("Upload", 1);


		// THIS A WAY BETTER WAY OF DOING THIS THAN PREVIOUSLY HNN
		if (UseClipArt) // User selected to use clipart
		{
			if(UseClipArt && typeof e.clipart !== 'undefined'){
				// user selected a VALID clip art
				//console.log(e)
				formData.append("Photo", e.clipart);
				Axios.post(Defines.SERVER + '/createPostsNoImage', 	{FoundItem: e.Type, Title: e.Title, Description: e.Description, 
				Country: LocationSelect.country, Region: LocationSelect.region, Area: e.Area, Question1: e.Question1,
			Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Upload: 0, Photo: e.clipart})
				.then((res) => {
					console.log("CLIP: " + res);
					navigate("/Post/" + res.data.IID);  
	
				}).catch((err) =>{
					alert("posting failed");
					console.log(err);
				});
			}
			else // No clip art selected
			{
				formData.append("Photo", "defaultphoto");

				Axios.post(Defines.SERVER + '/createPostsNoImage', 	{FoundItem: e.Type, Title: e.Title, Description: e.Description, 
				Country: LocationSelect.country, Region: LocationSelect.region, Area: e.Area, Question1: e.Question1,
			Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Upload: 0, Photo: "defaultphoto.jpg"})
				.then((res) => {
					//console.log("NO PHOTO1: " + res); // debug
					navigate("/Post/" + res.data.IID);
	
				}).catch((err) =>{
					alert("posting failed");
					console.log(err);
				});
			}
		}
		else // user select upload own photo
		{
			if (!file){
				// No file uploaded
				formData.append("Photo", "defaultphoto.jpg");

				Axios.post(Defines.SERVER + '/createPostsNoImage', 	
				{FoundItem: e.Type, Title: e.Title, Description: e.Description, 
					Country: LocationSelect.country, Region: LocationSelect.region, Area: e.Area, Question1: e.Question1,
				Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Upload: 0, Photo: "defaultphoto.jpg"}
				)
				.then((res) => {
					//console.log("NO PHOTO2: " + res); //debug
					navigate("/Post/" + res.data.IID);

				}).catch((err) =>{
					alert("posting failed");
					console.log(err);
				});	
			}
			else // user uploaded an image
			{
				// User uploads own photo
				formData.append("Photo",newPost.Photo);
				// route
				Axios.post(Defines.SERVER + '/createPosts', formData)
				.then((res) => {
					//console.log(res.data);
					//console.log("ID IS:" + res.data.IID);
					console.log("HERE:" + res.data.IID);
					navigate("/Post/" + res.data.IID);
	
				}).catch((err) =>{
					alert("it failed");
					console.log(err);
				});
			}
		}

		// OLD WAY OF DOING THINGS, LEFT IN JUST INCASE HNN
		// if (!SelectPhotoType){
		// 	// No photo selected
		// 	formData.append("Photo", "defaultphoto.jpg");

		// 	Axios.post(Defines.SERVER + '/createPostsNoImage', 	
		// 	{FoundItem: e.Type, Title: e.Title, Description: e.Description, 
		// 		Country: LocationSelect.country, Region: LocationSelect.region, Area: e.Area, Question1: e.Question1,
		// 	Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Upload: 0, Photo: "defaultphoto.jpg"}
		// 	)
		// 	.then((res) => {
		// 		console.log("NO PHOTO: " + res);
		// 		navigate("/Post/" + res.data.IID);

		// 	}).catch((err) =>{
		// 		alert("posting failed");
		// 		console.log(err);
		// 	});
		// }
		// else{
		// 	//user selected photo type

		// 	if(UseClipArt && typeof e.clipart !== 'undefined'){
		// 		// user selected a clip art
		// 		//console.log(e)
		// 		formData.append("Photo", e.clipart);
		// 		Axios.post(Defines.SERVER + '/createPostsNoImage', 	{FoundItem: e.Type, Title: e.Title, Description: e.Description, 
		// 		Country: LocationSelect.country, Region: LocationSelect.region, Area: e.Area, Question1: e.Question1,
		// 	Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Upload: 0, Photo: e.clipart})
		// 		.then((res) => {
		// 			console.log("CLIP: " + res);
		// 			navigate("/Post/" + res.data.IID);  
	
		// 		}).catch((err) =>{
		// 			alert("posting failed");
		// 			console.log(err);
		// 		});
		// 	} else if (file){
		// 		// User uploads own photo
		// 		formData.append("Photo",newPost.Photo);
		// 		// route
		// 		Axios.post(Defines.SERVER + '/createPosts', formData)
		// 		.then((res) => {
		// 			//console.log(res.data);
		// 			//console.log("ID IS:" + res.data.IID);
		// 			console.log("HERE:" + res.data.IID);
		// 			navigate("/Post/" + res.data.IID);
	
		// 		}).catch((err) =>{
		// 			alert("it failed");
		// 			console.log(err);
		// 		});
		// 	} else {

		// 		// User has no photo or no clipart selected. Upload with default image anyways.
		// 		formData.append("Photo", "defaultphoto");

		// 		Axios.post(Defines.SERVER + '/createPostsNoImage', 	{FoundItem: e.Type, Title: e.Title, Description: e.Description, 
		// 		Country: LocationSelect.country, Region: LocationSelect.region, Area: e.Area, Question1: e.Question1,
		// 	Answer1: e.Answer1, FinderID: authState.id, Tags: e.Tags, Upload: 0, Photo: "defaultphoto.jpg"})
		// 		.then((res) => {
		// 			console.log("NO PHOTO2: " + res);
		// 			navigate("/Post/" + res.data.IID);
	
		// 		}).catch((err) =>{
		// 			alert("posting failed");
		// 			console.log(err);
		// 		});
		// 	}
		// }
	}

	
	const handleChange = (e) =>{
		setNewPost({...newPost, [e.target.name]: e.target.value});
	}
	

	const handlePhoto = (e) => {
		setNewPost({...newPost, Photo: e.target.files[0]});
		console.log(e.target.files[0]);
		setFile(e.target.files[0])
	}

	const initialValues = {
		Title: "",
		Description: "",
		Question1: "",
		Answer1: "",
		//Country: "",
		//Region: "",
		Area: "",
		Tags: "",
		Type: true, // TRUE = FOUND ITEM, LOST = LOST ITEM
	}

	const validationSchemaobj = Yup.object().shape({
		Title: Yup.string().required().max(20, "Title too long, please user a shorter title"),
		Description: Yup.string(), // TODO MAX LENGTH 8192 TRUNCATE IF TOO LONG
		// Honestly you can fit the entire declaration of independence in 8192 characters
		// If people cannot make a description in that amount of characters, then honestly don't
		// know what to do.
		//Country: Yup.string(),
		//Region: Yup.string(),
		Area: Yup.string(),
		Question1: Yup.string(),
		Answer1: Yup.string(),
		Type: Yup.boolean(),

		//min().max() to set min and max length
	})
	
	return(
		<html className='bg-u'>
		<div className="create-post-container">
			

			<div className='form-section'>
			<Formik initialValues = {initialValues} onSubmit = {createPost} validationSchema = {validationSchemaobj}>
				<Form className="form-container">
					<ul>
					<div className='post-introduction'>
						<h2>Create a post</h2>
					</div>
						<div className='post-radio-container'>
							<Field component="div"> 
								{/* IT JUST WORKS - Todd Howard */}
									<input
									type="radio"
									id="post-radio1"
									className='post-radio-input hidden'
									defaultChecked={FoundRadioSelect.found === true}
									name="Type"
									value={true}
									/>
									<label htmlFor="post-radio1" className='post-radio-label'>Found this Item</label>

									<input
									type="radio"
									id="post-radio2"
									className='post-radio-input hidden'
									defaultChecked={FoundRadioSelect.found === false}
									name="Type"
									value={false}
									/>
									<label htmlFor="post-radio2" className='post-radio-label'>Lost this Item</label>
							</Field>
						</div>
						<div className='clear-float'></div> {/*CLEAR THE FLOAT FROM THE TYPE-BOX HNN*/}
						<ErrorMessage className = "error" name="Title" component="span"/>
						<li>
							<label className='post-box-labels' id="label-title">Title</label>

							{/* COMBO BOX (OLD WAY) */}
							{/* <ErrorMessage className = "error" name="Type" component="span"/>
							<Field name="Type" component="select" id='type-box'>
									<option value={true}>Found this item</option>
									<option value={false}>Lost this item</option>
							</Field> */}
							{/* <div className='clear-float'></div> CLEAR THE FLOAT FROM THE TYPE-BOX HNN */}

							<Field 
							className="input-field" 
							id='title-box'
							name="Title" 
							placeholder="Enter a brief title"
							/>
							{/* <span>Enter a brief descriptive title.</span> */}
						</li>

						<ErrorMessage className = "error" name="Description" component="span"/>
						<li>
							<label className='post-box-labels' id="label-description">Description</label>
							<Field 
							className="input-field" 
							id='description-box'
							name="Description" 
							placeholder="Describe the item breifly"
							as="textarea"
							/>
							{/* <span>Describe the item without revealing too much information.</span> */}
						</li>

						<ErrorMessage className = "error" name="Location" component="span"/>
						<li>
							<label className='post-box-labels' id="label-location">Location</label>
							<div>
								<div>
									<CountryDropdown
									value={LocationSelect.country}
									onChange={(val) => handleLocationCountry(val)} 
									priorityOptions={["US", "CA", "GB"]} 
									className='post-combo-country'
									/>
								</div>
								<div>
									<RegionDropdown
									country={LocationSelect.country}
									value={LocationSelect.region}
									onChange={(val) => handleLocationRegion(val)} 
									className='post-combo-region'/>
								</div>
							</div>
							<Field 
							className="input-field" 
							id='area-box'
							name="Area" 
							placeholder="Describe the whereabouts of the item"
							as="textarea"
							/>
							{/* <span>Describe where the item was.</span> */}
						</li>

						<ErrorMessage className = "error" name="Question1" component="span"/>
						<li>
							<label className='post-box-labels' id="label-question1">Question</label>
							<Field 
							className="input-field" 
							id='question1-box'
							name="Question1" 
							placeholder="Enter a question to help return this item"
							as="textarea"
							/>
							{/* <span>Enter a question that only the owner of the item would know.</span> */}
						</li>

						<ErrorMessage className = "error" name="Answer1" component="span"/>
						<li>
							<label className='post-box-labels' id="label-answer1">Answer</label>
							<Field 
							className="input-field" 
							id='answer1-box'
							name="Answer1" 
							placeholder="Enter the correct answer to the question above"
							as="textarea"
							/>
							{/* <span>The correct answer to the question.</span> */}
						</li>

						<ErrorMessage className = "error" name="Tags" component="span"/>
						<li>
							<label className='post-box-labels' id="label-tags">Enter Search Tags</label>
							<Field 
							className="input-field" 
							id='tags-box'
							name="Tags" 
							placeholder="Describe keywords of the item comma seperated (e.g. Title: Wallet | Tags: brown, leather, Gucci)"
							/>
							{/* <span>Tags to help users search for item e.g. electronics, card, jewelry</span> */}
						</li>

						<li>
							<label className='post-box-labels' id="label-tags">Image Upload</label>
{/* IMAGES ============================================================================================*/}
							<div className='post-radio-container2'>
							<Field component="div"> 
									<input
									type="radio"
									id="post-radio-image1"
									className='post-radio-input hidden'
									defaultChecked={UseClipArt === false}
									name="Clipart"
									value={true}
									onChange={handleImageTypeChange} /* WILL ONLY TRIGGER IF SWITCHED TO OTHER */
									/>
									<label htmlFor="post-radio-image1" className='post-radio-label'>Image Upload</label>

									<input
									type="radio"
									id="post-radio-image2"
									className='post-radio-input hidden'
									defaultChecked={UseClipArt === true}
									name="Clipart"
									value={false}
									onChange={handleImageTypeChange} /* WILL ONLY TRIGGER IF SWITCHED TO OTHER */
									/>
									<label htmlFor="post-radio-image2" className='post-radio-label'>Use Clipart</label>
							</Field>
							</div>

							{
							(!UseClipArt)?				
							// User selected to upload photo
							<div className='post-image-container'>
								{/* IT JUST WORKS - Todd Howard */}
								<div className='post-image-file-name-label'>{file?file.name:"No File Chosen"}</div>

								<label htmlFor="post-upload-image-button">
									{
									<div>
										<img src={file? URL.createObjectURL(file) : uploadIcon} alt={file? file.name : null} className = "post-image-preview" />
									</div>
									}
								</label>
								<div className='post-image-upload-button'>
									<input
									className='hidden'
									id = "post-upload-image-button"
									type = 'file'
									accept = '.png, .jpg, .jpeg'
									name = 'Photo'
									onChange = {handlePhoto}
									/>
								</div>
								{/* <img className = "imgupload" src={file? URL.createObjectURL(file) : "/defaultphoto.jpg"} alt={file? file.name : null} /> */}
							</div>:
							// User selected to use clip art.
							<div>
								<div id="checkbox-group"></div>
								<div role="group" aria-labelledby="checkbox-group">
									<label>
									<img id = "clipArt" src={"/clipart/wallet.png"} />
									<Field type="radio" name="clipart" value="wallet.png" />
									Wallet
									</label>

									<label>
									<img id = "clipArt" src={"/clipart/card.png"} />
									<Field type="radio" name="clipart" value="card.png" />
									Card
									</label>

									<label>
									<img id = "clipArt" src={"/clipart/jewelry.png"} />
									<Field type="radio" name="clipart" value="jewelry.png" />
									jewelry
									</label>

									<label>
									<img id = "clipArt" src={"/clipart/electronics.png"} />
									<Field type="radio" name="clipart" value="electronics.png" />
									Electronic
									</label>
								</div>

							</div>
							}
							{/* <span>Upload a photo of the item. Do not upload a photo if it contains revealing information e.g. credit card</span> */}
						</li>

						<button className = "submit-button" type = "submit"> Create Post</button>

					</ul>

					{/* <label>Title: </label>
					<ErrorMessage name="Title" component="span"/>
					<Field 
					id="inputPost" 
					name="Title" 
					placeholder="Title"
					/> */}

					{/* <label> Description of the item: </label>
					<ErrorMessage name="Description" component="span"/>
					<Field 
					id="inputPost" 
					name="Description" 
					placeholder="Description of item"
					/> */}

					{/* <div>
						<CountryDropdown
						value={LocationSelect.country}
						onChange={(val) => handleLocationCountry(val)} 
						priorityOptions={["US", "CA", "GB"]} />
						<RegionDropdown
						country={LocationSelect.country}
						value={LocationSelect.region}
						onChange={(val) => handleLocationRegion(val)} />
					</div> */}

					{/* <label> Location (Area): </label>
					<ErrorMessage name="Location" component="span"/>
					<Field 
					id="inputPost" 
					name="Area" 
					placeholder="Area of item"
					/> */}

					{/* <label> Question to ask owner: </label>
					<ErrorMessage name="Question1" component="span"/>
					<Field 
					id="inputPost" 
					name="Question1" 
					placeholder="Enter a question only the owner would know"
					/> */}

					{/* <label> Correct answer from owner: </label>
					<ErrorMessage name="Answer1" component="span"/>
					<Field 
					id="inputPost" 
					name="Answer1" 
					placeholder="Correct answer to the question"
					/> */}

					{/* NOT USED ANYMORE HNN
					<div id="checkbox-group">Post Type</div>
					<div role="group" aria-labelledby="checkbox-group">
						<label>
						<Field type="checkbox" name="checked" value="lost" />
						Lost this item?
						</label>
					</div> */}

					{/* 
					<label> Search Tags: </label>
					<ErrorMessage name="Tags" component="span"/>
					<Field 
					id="inputPost" 
					name="Tags" 
					placeholder="Search tags to help with searching"
					/> */}

				{/* {
				(SelectPhotoType)?
				((!UseClipArt)?				
				// User selected to upload photo
				<div>
					<input
					type = 'file'
					accept = '.png, .jpg, .jpeg'
					name = 'Photo'
					onChange = {handlePhoto}
					/>

					<img className = "imgupload" src={file? URL.createObjectURL(file) : "/defaultphoto.jpg"} alt={file? file.name : null}/>
				</div>:

				// User selected to use clip art.
				<div>
					<div id="checkbox-group">Post Type</div>
					<div role="group" aria-labelledby="checkbox-group">
						<label>
						<img id = "clipArt" src={"/clipart/wallet.png"} />
						<Field type="checkbox" name="clipart" value="wallet.png" />
						Wallet
						</label>

						<label>
						<img id = "clipArt" src={"/clipart/card.png"} />
              			<Field type="checkbox" name="clipart" value="card.png" />
              			Card
            			</label>

						<label>
						<img id = "clipArt" src={"/clipart/jewelry.png"} />
              			<Field type="checkbox" name="clipart" value="jewelry.png" />
              			jewelry
            			</label>

						<label>
						<img id = "clipArt" src={"/clipart/electronics.png"} />
              			<Field type="checkbox" name="clipart" value="electronic.png" />
              			Electronic
            			</label>
					</div>

				</div>
				): 
				// User has not selected the type of image
				<div>
					<p>Select type of Image</p>
					
					<button type = "button" onClick={()=>{
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
						setSelectPhotoType(true);
						setUseClipArt(false);
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
					}}>Upload Image</button>

					<button type = "button" onClick={()=>{
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
						setSelectPhotoType(true);
						setUseClipArt(true);
						console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
					}}>Use clip art</button>
				</div>
				} */}

				</Form>
			</Formik>
			</div>
		</div>
		</html>
	);
}

export default PostPage;



// Left here just incase, old way of doing images.
// {
// 	(SelectPhotoType)?
// 	((!UseClipArt)?				
// 	// User selected to upload photo
// 	<div>
// 		<input
// 		type = 'file'
// 		accept = '.png, .jpg, .jpeg'
// 		name = 'Photo'
// 		onChange = {handlePhoto}
// 		/>

// 		<img className = "imgupload" src={file? URL.createObjectURL(file) : "/defaultphoto.jpg"} alt={file? file.name : null}/>
// 	</div>:

// 	// User selected to use clip art.
// 	<div>
// 		<div id="checkbox-group">Post Type</div>
// 		<div role="group" aria-labelledby="checkbox-group">
// 			<label>
// 			<img id = "clipArt" src={"/clipart/wallet.png"} />
// 			<Field type="radio" name="clipart" value="wallet.png" />
// 			Wallet
// 			</label>

// 			<label>
// 			<img id = "clipArt" src={"/clipart/card.png"} />
// 			<Field type="radio" name="clipart" value="card.png" />
// 			Card
// 			</label>

// 			<label>
// 			<img id = "clipArt" src={"/clipart/jewelry.png"} />
// 			<Field type="radio" name="clipart" value="jewelry.png" />
// 			jewelry
// 			</label>

// 			<label>
// 			<img id = "clipArt" src={"/clipart/electronics.png"} />
// 			<Field type="radio" name="clipart" value="electronics.png" />
// 			Electronic
// 			</label>
// 		</div>

// 	</div>
// 	): 
// 	// User has not selected the type of image
// 	<div>
// 		<p>Select type of Image</p>
		
// 		<button className = "image-button" type = "button" onClick={()=>{
// 			console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
// 			setSelectPhotoType(true);
// 			setUseClipArt(false);
// 			console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
// 		}}>Upload Image</button>

// 		<button className = "image-button" type = "button" onClick={()=>{
// 			console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
// 			setSelectPhotoType(true);
// 			setUseClipArt(true);
// 			console.log("USE PHOTO:" + SelectPhotoType + UseClipArt)
// 		}}>Use clip art</button>
// 	</div>
// 	}