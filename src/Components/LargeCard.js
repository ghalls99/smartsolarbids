import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css';

const LargeCard = () => {
	return (
		<div className='container my-2 p-5 d-flex justify-content-between shadow rounded-3'>
			<div className='d-flex-col mx-5'>
				<h2 className='text-start'>Still Have questions?</h2>
				<p className='text-start'>
					Talk to one of our specialits to help resolve any additional questions
					you may have, and with full knoweldge we'll help you to get the best
					bid possible.
				</p>
			</div>
			<div className='mx-5'>
				<h2>Still Have questions?</h2>
			</div>
		</div>
	);
};

export default LargeCard;
