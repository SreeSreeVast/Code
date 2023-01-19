import { useState } from "react";
import Axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup' // import everything from yup form validation library

import * as Defines from '../Defines.js'
//styling
import './SearchPage.css';


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

    const searchItem = (e) => {

		const formData = new FormData();
		formData.append("createdAt", e.createdAt);
		formData.append("Country", e.Country);
		formData.append("Region", e.Region);
		formData.append("Title", e.Title);
		formData.append("Tags", e.Tags);

		Axios.post(Defines.SERVER+'/searchPosts', {createdAt: e.createdAt, Country: e.Country, Region: e.Region,Title: e.Title,Tags: e.Tags}).then((response) => {
            //alert("it worked");
 
			console.log(response.data);
			console.log(e.createdAt);
			console.log(e.Title);
			console.log(e.Country);
			console.log(e.Region);
            setPostList(response.data);
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
		createdAt: Yup.string(),
		Country: Yup.string(),
		Region: Yup.string(),
		Title: Yup.string(),
		Tags: Yup.string(),

		//min().max() to set min and max length
	})
    return (
        <div className="searchForm">
			<div className="search-text">
				<h1>Search Missing Items</h1>
			</div>
			<div className="filter-text">
				<h3>Filters</h3>
			</div>
		<Formik initialValues = {initialValues} onSubmit = {searchItem} validationSchema = {validationSchemaobj}>
			<Form className="formContainer">
				<label>Date: </label>
				<ErrorMessage name="Title" component="span"/>
				<Field 
				id="input" 
				name="createdAt" 
				placeholder="year..."
				/>
				<label>Country: </label>
				<ErrorMessage name="Country" component="span"/>
				<Field 
				id="input" 
				name="Country" 
				placeholder="country..."
				/>
				<label>State/Province: </label>
				<ErrorMessage name="State" component="span"/>
				<Field 
				id="input" 
				name="Region" 
				placeholder="state/province/region..."
				/>	
				<label>Item: </label>
				<ErrorMessage name="Item" component="span"/>
				<Field 
				id="input" 
				name="Title" 
				placeholder="item/keyword..."
				/>
				<label>Tags: </label>
				<ErrorMessage name="Tags" component="span"/>
				<Field 
				id="input" 
				name="Tags" 
				placeholder="tags..."
				/>		
				<button type="submit">Search</button>
				<br/>	
				<br/>	
				{/* <button type="button" onClick={viewItem}>View All</button> */}

			<table>
  				<tr>
    				<th>Title</th>
    				<th>Date</th>
					<th>Location</th>
  				</tr>


                {postList.map((val,key) => {
                    return (
				<tr>
    				<a href = {Defines.SERVER + "/Post/" + val.IID}><td>{val.Title}</td> </a>
    				<td>{val.createdAt.split("T")[0]}</td>
					<td>{val.Area}</td>
  				</tr>
                    );
                })}
			</table>
			</Form>
		</Formik>
		</div>
    );
}

export default Search