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
						<h2 className='text-start'>Still Have Questions?</h2>
						<p className='text-start'>
							Talk to one of our specialists to help resolve any additional
							questions you may have, and with the full knowledge that we'll
							help you to get the best bid possible.
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
