import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios'
import * as Defines from '../Defines.js'
import './AnswersPage.css';

function AnswersPage()
{
    const [answersList, setAnswersList]= useState([]);
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


	const viewAnswers = () => 
	{
		Axios.post(Defines.SERVER + '/AnswersPage', {FinderID:authState.id}).then((response) => 
		{
            //alert("it worked");    
			console.log(response.data);
            setAnswersList(response.data);
			
		}).catch(() =>{
			//alert("it failed");
		})
	};

    return (
        <div className="header">
			<h1 className="answers-header">Answers Submitted To Your Posts</h1>
			<h2 className="answers-text">Click on the user that sent the correct answer to send them a message and return the item back to them.</h2>
			{viewAnswers()}

			<table className="answers-table-box">
  				<tr>
				  	<th>Sender </th>
    				<th>Answer </th>
					<th>Post Title </th>
  				</tr>

                {answersList.map((val,key) => 
				{
                    return (
				<tr>
					<a href = {"http://54.221.141.54:3000" + "/Message"}><td>{val.Sender}</td> </a>
					<td>{val.Answer}</td>
					<a href = {"http://54.221.141.54:3000" + "/Post/" + val.PostID}> <td>{val.PostTitle}</td> </a>
  				</tr>
                    );
                })}
			</table>
		</div>
    );   		
}

export default AnswersPage;