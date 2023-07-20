import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css';
import panels from '../images/panels.jpg';

const LargeCard = () => {
	return (
		<div className='container my-2 p-5 text-center shadow rounded-3 my-5'>
			<div className='row'>
				<div className='col-lg-6'>
					<div className='mx-md-5 my-5'>
						<h2 className='text-start'>Don't have a bid?</h2>
						<p className='text-start'>
							Take a short quiz to help get you the best bid possible, tailored
							specifically to you, and to your home.
						</p>
						<button className='btn btn-primary d-flex justify-content-start'>
							Take the Quiz
						</button>
					</div>
				</div>
				<div className='col-lg-6 d-none d-lg-block'>
					<img
						src={panels}
						alt='Hero'
						className='img-fluid'
						style={{borderRadius: '16px', width: '500px', height: '250px'}}
					/>
				</div>
			</div>
		</div>
	);
};

export default LargeCard;
