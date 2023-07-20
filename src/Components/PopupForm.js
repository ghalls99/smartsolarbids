import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css'; // Import a separate CSS file for styling the popup form
import {Close} from '@mui/icons-material';

const PopupForm = ({showPopup, closePopup}) => {
	const inputFile = useRef(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		// You can access form data using the event.target object
		// For example: const formData = new FormData(e.target);
		// Then, you can retrieve form values using formData.get('fieldName')
		closePopup();
	};

	const onButtonClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
	};

	return (
		<div>
			{showPopup && (
				<div className='popup-overlay'>
					<div className='popup-content p-5'>
						<button
							type='button'
							className='btn d-flex mb-3 p-0'
							onClick={closePopup}>
							<Close fontSize='small' />
						</button>
						<p className='mb-5' style={{fontSize: '20px'}}>
							Start saving today. Enter your info to get your bid reviewed by a
							specialist immediately
						</p>
						<form onSubmit={handleSubmit}>
							<div className='row'>
								<div className='col-md-6'>
									<div className='mb-3'>
										<label htmlFor='firstName' className='form-label'>
											First Name
										</label>
										<input
											type='text'
											className='form-control'
											id='firstName'
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='phone' className='form-label'>
											Phone Number
										</label>
										<input type='text' className='form-control' id='phone' />
									</div>
								</div>
								<div className='col-md-6'>
									<div className='mb-3'>
										<label htmlFor='lastName' className='form-label'>
											Last Name
										</label>
										<input type='text' className='form-control' id='lastName' />
									</div>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Email
										</label>
										<input type='email' className='form-control' id='email' />
									</div>
								</div>
							</div>
							<input
								type='file'
								id='file'
								ref={inputFile}
								style={{display: 'none'}}
							/>
							<button
								type='button'
								className='btn btn-primary mb-5 d-flex'
								onClick={onButtonClick}>
								<p style={{margin: 0}}>Select File</p>
							</button>
							<div className='d-grid gap-2'>
								<button className='btn btn-success' type='button'>
									Send Your Bid
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default PopupForm;
