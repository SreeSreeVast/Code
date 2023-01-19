import React from 'react';
import './HomePage.css';
// 	<img className="intro-image1" src={process.env.PUBLIC_URL + "/IntroductionPhoto1.jpg"} alt="Picture of man finding item on ground."></img>

function HomePage() {

  	return (
		<div className='home-page'>
			<div className="introduction">
				{/*On left side HNN*/}
				<div className='introduction-text-section'>
					<h1>The platform to help return lost items to their owners</h1>
					<p>Sign up for a free account today.</p>
					<a href="http://54.221.141.54:3000/registration" class="button3">Sign Up Now!</a>
				</div>
				{/*On right side HNN*/}
				<div className="introduction-image-section">
					<img className="intro-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto1.jpg"} alt="Picture of two people exchanging a book."></img>
				</div>
			</div>

			<div className="section2">
				<h2>Did you find a lost possession?</h2>
				<p>Our platform makes it easy and simple to return items to their proper owners. 
					The ability to ask a verification question about the item makes it
					easy to determine who is the rightful owner. See all the answers to
					the verification question and initiate messaging with the person who
					answered correctly. Ask further questions or discuss a method of returning
					the item to the owner. After returning the item, simply delete your post and
					be on your way.
				</p>

				<div className='section2-steps'>
					<div className='steps'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto2.jpg"} alt="Picture of man finding item on ground."></img>
						<br></br>
						<br></br>
						<a className= 'links'href='http://54.221.141.54:3000/search'>Find Items</a>
					</div>
					<div className='steps'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto3.jpg"} alt="Picture of hands using laptop."></img>
						<p>Make A Post</p>
					</div>
					<div className='steps'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto4.jpg"} alt="Picture of person typing."></img>
						<p>Chat With Owner</p>
					</div>
					<div className='steps'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto5.jpg"} alt="Picture of person giving item to another person."></img>
						<p>Return Item</p>
					</div>
				</div>
			</div>

			<div className="section3">
			<h2>Did you lose something precious?</h2>
				<p>Search through posts made by other users. When you find what you lost,
				contact the finder and get it returned to you.
				</p>

				<div className='section3-steps'>
					<div className='steps2'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto3.jpg"} alt="Picture of hands using laptop."></img>
						<p className='section3-steps-description'>Search Or Make A Post</p>
					</div>
					<div className='steps2'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto4.jpg"} alt="Picture of person typing."></img>
						<p className='section3-steps-description'>Chat With Finders</p>
					</div>
					<div className='steps2'>
						<img className="intro-image steps-image" src={process.env.PUBLIC_URL + "/IntroductionPhoto5.jpg"} alt="Picture of person giving item to another person."></img>
						<p className='section3-steps-description'>Get Item Returned</p>
					</div>
				</div>

			</div>

		</div>
  	);

}

export default HomePage;

