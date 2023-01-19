import { useState } from "react";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library
import './SearchPage.css';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useTable, useSortBy } from 'react-table'

import * as Defines from '../Defines.js'
import { string } from "yup/lib/locale";

function Search(){
    const [searchTerm, setSearch]= useState("");
    const [searchCountry, setCountry]= useState("");
    const [searchCity, setCity]= useState("");
	const [searchDate, setDate]= useState("");
    const [postList, setPostList]= useState([]);

	// AWS route
    // 	Axios.post('http://54.221.141.54:3001/viewItem', {ID: id}).then((res) => {
    // Local testing http://localhost:3001/

	const viewItem = () =>{
		Axios.get(Defines.SERVER + '/view').then((response) => {
            //alert("it worked");    
			console.log(response.data);
            setPostList(response.data);
		}).catch(() =>{
			//alert("it failed");
		})
	};

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
	const [value, onChange] = useState(new Date());
    const searchItem = (e) => {

		const formData = new FormData();
		formData.append("createdAt", e.createdAt);
		formData.append("Country", LocationSelect.country);
		formData.append("Region", LocationSelect.region);
		formData.append("Title", e.Title);
		formData.append("Tags", e.Tags);

		Axios.post(Defines.SERVER+'/searchPosts', {createdAt: e.createdAt, Country: LocationSelect.country, Region: LocationSelect.region,Title: e.Title,Tags: e.Tags}).then((response) => {
            //alert("it worked");
 
			console.log(response.data);
            setPostList(response.data);
			if(response.data.length==0){
				alert("NO ITEMS");
			}

		}).catch(() =>{
			//alert("it failed");
		})
	};

	const initialValues = {
		createdAt: "",
		Country: "",
		Region: "",
		Title: "",
		Tags: "",
	}
	const validationSchemaobj = Yup.object().shape({
		createdAt: Yup.string().min(10,"Use YYYY-MM-DD Format"),
		Country: Yup.string(),
		Region: Yup.string(),
		Title: Yup.string(),
		Tags: Yup.string(),

		//min().max() to set min and max length
	})
	

	function sortTitle() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts2");
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
		table = document.getElementById("posts2");
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
	  function sortLoc() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts2");
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
	  function sortItem() {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("posts2");
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
	  function myFunction() {
		var x = document.getElementById("posts2");
		var y = document.getElementById("field-show");
		x.style.display = "table";
		y.style.display = "table-row-group";
	}
	  function dropper() {
		document.getElementById("myDropdown").classList.toggle("show");
	  }
    return (
		<html className="u">
		<script src="sorttable.js"></script>
        <div className="searchForm2">
		<Formik initialValues = {initialValues} onSubmit = {searchItem} validationSchema = {validationSchemaobj}>
			<div className="bg">
			<Form className="form-container2">
				<h1 className="search-text2">Search</h1>
                <h3 className="filter-text2">Search to find any lost or found item!</h3>
				{/* <b className="desc-text2">Search to find any lost or found item!</b> */}
				<div id='box'>
				<div className="dropdown">
				<button onClick={dropper}className="dropbtn">Advanced Filters</button>
					<div id="myDropdown" className="dropdown-content">
					{/* <button onClick={sortTable}>Found or Lost Item Sort</button> */}
					<label className="label-loc2">Date </label>
					<ErrorMessage className="error2" name="createdAt" component="span"/>
					<li>
						
						<Field
						className="user-input2"
						id="input" 
						name="createdAt" 
						placeholder="YYYY-MM-DD..."
						/>
					</li>
					<label className="label-loc2">Location</label>
					<ErrorMessage className = "error2" name="Location" component="span"/>
					<li>
						<div>
							<CountryDropdown
							className="country-box"
							value={LocationSelect.country}
							onChange={(val) => handleLocationCountry(val)} 
							priorityOptions={["US", "CA", "GB"]} />
							<RegionDropdown
							className="region-box"
							country={LocationSelect.country}
							value={LocationSelect.region}
							onChange={(val) => handleLocationRegion(val)} />
						</div>
					</li>
					<label className="label-loc2">Tags </label>
					<ErrorMessage name="Tags" component="span"/>
					<li>
						<Field
						className="user-input2" 
						id="input" 
						name="Tags" 
						placeholder="(eg. tags for Apple - red, fruit)..."
						/>
					</li>	
					</div>
				</div>
				</div>
				<br></br>
				{/* <label className="label-loc2">Item </label> */}
				<ErrorMessage name="Item" component="span"/>
				<li>
					<Field 
					className="user-input2"
					id="input" 
					name="Title" 
					placeholder="search items..."
					/>
				</li>
				<button onClick = {myFunction} className = "button2" type="submit">Search</button>
				{/* <button type="button" onClick={viewItem}>View All</button> */}
			<table id="posts2">
  				<tr id="field-show">
				  	<th id = "sort">Post</th>
    				<th id ="sort" onClick={sortTitle}>Title</th>
    				<th id ="sort" onClick={sortDate}>Date</th>
					<th id ="sort" onClick={sortLoc}>Location</th>
					<th id ="sort" onClick={sortItem}>Item Type</th>
  				</tr>

                {postList.map((val,key) => {
                return (
				<tr className="field-box2">
    				
					<td><img
                    className="image2"
                    src = {process.env.PUBLIC_URL + (val.Upload?"/userimages/":"/clipart/") + val.ImageName}
					/></td>
					<a href = {"http://54.221.141.54:3000" + "/Post/" + val.IID}>
						<td>{val.Title}</td></a>
    				<td >{val.createdAt.split("T")[0]}</td>
					<td >{val.Area ? val.Area : '-'}</td>
					<td >{val.FoundItem ? 'Found':'Lost'}</td>
  				</tr>
                    );
                })}
			</table>
			</Form>
			</div>
		</Formik>
		</div>
		</html>
    );
}

export default Search