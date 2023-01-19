import Axios from 'axios'
import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' 

// Get defines HNN
import * as Defines from '../Defines.js'

const MessagePage = () => {
	const [messageList, setMessageList]= useState([]);
	const [authState, setAuthState] = useState({	
		username: "",	
		id: 0,	
		status: false,	
	  });	
	  useEffect(() => {	
		Axios	
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

	const createMessage = (e) => 
	{
		Axios.post(Defines.SERVER + '/createMsg', {Sender:authState.username, Receiver: e.Receiver, Message: e.Message})
		.then((res) => {
			alert("Message successfully sent.");
			console.log(res.data);

		}).catch((err) =>{
			alert("it failed");
			console.log(err);
		});

	};

	const initialValues = 
	{
		Receiver: "",
		Sender: "",
		Message: "",
	};

	const validationSchemaobj = Yup.object().shape(
		{
		Receiver: Yup.string().required(),
		Sender: Yup.number().integer(),
		Message: Yup.string().required()

	})



	return(

		<div className="createPostForm">
		<Formik initialValues = {initialValues} onSubmit = {createMessage} validationSchema = {validationSchemaobj}>

			<Form className="formContainer">

				<label>Enter the username of the user you want to message: </label>
				<ErrorMessage name="Receiver:" component="span"/>
				<Field 
				id="inputMsg" 
				name="Receiver" 
				placeholder="Enter username..."
				/>

				<label> Enter your message: </label>
				<ErrorMessage name="Message" component="span"/>
				<Field 
				id="inputMsg" 
				name="Message" 
				placeholder="Enter message..."
				/>

			<button type = "submit"> Send Message</button>


			</Form>

		</Formik>

	</div>
	);
}

export default MessagePage;