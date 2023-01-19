import React, { useState, useEffect, useContext } from "react";
import Axios from 'axios'
import './InboxPage.css';
import * as Defines from '../Defines.js'

function InboxPage()
{
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

    const viewMessage = () => 
	{
		Axios.post(Defines.SERVER + '/Inbox', {Reciever:authState.username}).then((response) => 
		{
            //alert("it worked");    
			console.log(response.data);
			console.log(authState.id);
            setMessageList(response.data);
			
		}).catch(() =>{
			//alert("it failed");
		})
	};

    return (
        <div className="header">
			<h1 className="message-text">Inbox</h1>
			{viewMessage()}
			<table className="table-box">
  				<tr>
    				<th>Sender </th>
    				<th>Message</th>
  				</tr>

                {messageList.map((val,key) => 
				{
                    return (
				

				<tr>
					<a href = {"http://localhost:3000" + "/Message"}><td>{val.Sender}</td> </a>
					<td>{val.Message}</td>
  				</tr>
                    );
                })}
			</table>
		</div>
    );   
}
export default InboxPage;