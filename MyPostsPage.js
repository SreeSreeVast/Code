import React, { useState, useContext, useEffect  } from "react";
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library
import { useParams } from 'react-router-dom'
import './MyPostPage.css';

// Get defines HNN
import * as Defines from '../Defines.js'

const MyPosts = () => {
	const [authState, setAuthState] = useState({	
		username: "",	
		id: -1,	
		status: false,	
	  });	
	  const [postList, setPostList]= useState([]);
	// get userid once at start of page
	useEffect(() => {	

	Axios.get(Defines.SERVER + "/Users/auth", {headers: {accessToken: localStorage.getItem("accessToken"),	}, }).then((response) => {	
		if (response.data.error) {	
			setAuthState({ ...authState, status: false });	
			console.log("NOGO")
		} else {	
			setAuthState({	
			username: response.data.username,	
			id: response.data.id,
			status: true,});
			}
			post(response.data.id);
			// console.log("HERE"+userid);
		});	
		window.scrollTo(0, 0);
	}, []);	
	// const post = () =>{
	// 	Axios.post(Defines.SERVER+'/viewAll', {FinderID: authState.id}).then((response) => {
    //         //alert("it worked");
	// 		//console.log("USER ID: ")
	// 		//console.log(authState.id)
    //         setPostList(response.data);
	// 	}).catch(() =>{
	// 		//alert("it failed");
	// 	})
	// };
	
	const post = (userID) =>{
		Axios.post(Defines.SERVER+'/viewAll', {FinderID:userID}).then((response) => {
			//console.log(authState.id);
			//console.log(response.data);
            setPostList(response.data);
		}).catch(() =>{
			// alert("it failed");
		})
	};
	function sortTitle() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts");
		switching = true;
		// Set the sorting direction to ascending:
		dir = "asc";
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
		  // Start by saying: no switching is done:
		  switching = false;
		  rows = table.rows;
		  /* Loop through all table rows (except the
		  first, which contains table headers): */
		  for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[1];
			y = rows[i + 1].getElementsByTagName("TD")[1];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			} else if (dir == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			}
		  }
		  if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		  } else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
			  dir = "desc";
			  switching = true;
			}
		  }
		}
	  }
	  function sortDate() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts");
		switching = true;
		// Set the sorting direction to ascending:
		dir = "asc";
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
		  // Start by saying: no switching is done:
		  switching = false;
		  rows = table.rows;
		  /* Loop through all table rows (except the
		  first, which contains table headers): */
		  for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[3];
			y = rows[i + 1].getElementsByTagName("TD")[3];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			} else if (dir == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			}
		  }
		  if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		  } else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
			  dir = "desc";
			  switching = true;
			}
		  }
		}
	  }
	  function sortQ() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts");
		switching = true;
		// Set the sorting direction to ascending:
		dir = "asc";
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
		  // Start by saying: no switching is done:
		  switching = false;
		  rows = table.rows;
		  /* Loop through all table rows (except the
		  first, which contains table headers): */
		  for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[4];
			y = rows[i + 1].getElementsByTagName("TD")[4];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			} else if (dir == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			}
		  }
		  if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		  } else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
			  dir = "desc";
			  switching = true;
			}
		  }
		}
	  }
	  function sortA() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts");
		switching = true;
		// Set the sorting direction to ascending:
		dir = "asc";
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
		  // Start by saying: no switching is done:
		  switching = false;
		  rows = table.rows;
		  /* Loop through all table rows (except the
		  first, which contains table headers): */
		  for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[5];
			y = rows[i + 1].getElementsByTagName("TD")[5];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			} else if (dir == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			}
		  }
		  if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		  } else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
			  dir = "desc";
			  switching = true;
			}
		  }
		}
	  }
	  function sortItem() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts");
		switching = true;
		// Set the sorting direction to ascending:
		dir = "asc";
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
		  // Start by saying: no switching is done:
		  switching = false;
		  rows = table.rows;
		  /* Loop through all table rows (except the
		  first, which contains table headers): */
		  for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[2];
			y = rows[i + 1].getElementsByTagName("TD")[2];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			} else if (dir == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			}
		  }
		  if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		  } else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
			  dir = "desc";
			  switching = true;
			}
		  }
		}
	  }
	  
	return (
		<html className="p">
		<div className="post-mine">
		<h1 className="user">{authState.username}'s Posts</h1>
		<b className="greet">Find all your posts here! Navigate to your posts to edit and delete them.</b>
		{/* {post()} */}
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<table className ='' id="posts"> 
				<tbody>
  				<tr>
    				<th className="th-tab">Post</th>
					<th className="th-tab" id ="sort" onClick={sortTitle}>Title</th>
					<th className="th-tab" id ="sort" onClick={sortItem}>Item Type</th>
    				<th className="th-tab" id ="sort" onClick={sortDate}>Date</th>
					<th className="th-tab" id ="sort" onClick={sortQ}>Question</th>
					<th className="th-tab" id ="sort" onClick={sortA}>Answer</th>
  				</tr>
                {postList.map((val,key) => {
                return (
				<tr>
    				<td><img
                    className="image2"
                    src = {process.env.PUBLIC_URL + (val.Upload?"/userimages/":"/clipart/") + val.ImageName}
					/></td>
					<a href = {"http://54.221.141.54:3000" + "/Post/" + val.IID}>
						<td>{val.Title}</td></a>
					<td >{val.FoundItem ? 'Found':'Lost'}</td>
    				<td>{val.createdAt.split("T")[0]}</td>
					<td>{val.Question1 ? val.Question1 : '-No Question-'}</td>
					<td>{val.Answer1 ? val.Answer1 : '-No Answer-'}</td>
  				</tr>
				
                );
                })}
				</tbody>
			</table>
		</div>
		</html>
	);
};
export default MyPosts;