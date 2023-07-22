import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css'; // Import a separate CSS file for styling the popup form
import {Close} from '@mui/icons-material';
import axios from 'axios';

const PopupForm = async ({showPopup, closePopup}) => {
	const inputFile = useRef(null);
	const [inputFields, setInputFields] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Access the file input element using the ref
		const selectedFile = inputFile.current.files[0];

		// If a file is selected, you can proceed with your API request
		if (selectedFile) {
			// Create a new FormData object to send the file
			const data = {
				...inputFields,
				fileName: selectedFile.name,
				fileType: selectedFile.type,
			};

			const params = {
				method: 'POST',
				url: `https://dizzcxhi23.execute-api.us-east-1.amazonaws.com/upload-file`,
				headers: {},
				data: data,
			};

			// Now you can send the formData object with the file via API
			// For example:
			console.log('sending to URL');
			const res = await axios(params);

			console.log(res);
		}

		// Close the popup after the API request is handled
		closePopup();
	};

	const handleInputFields = (value, id) => {
		setInputFields({...inputFields, [id]: value});
	};

	const onButtonClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
		console.log('successful');
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
											onChange={(event, value) =>
												handleInputFields(value, event.target.id)
											}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='phone' className='form-label'>
											Phone Number
										</label>
										<input
											type='text'
											className='form-control'
											id='phone'
											onChange={(event, value) =>
												handleInputFields(value, event.target.id)
											}
										/>
									</div>
								</div>
								<div className='col-md-6'>
									<div className='mb-3'>
										<label htmlFor='lastName' className='form-label'>
											Last Name
										</label>
										<input
											type='text'
											className='form-control'
											id='lastName'
											onChange={(event, value) =>
												handleInputFields(value, event.target.id)
											}
										/>
									</div>
									<div className='mb-3'>
										<label htmlFor='email' className='form-label'>
											Email
										</label>
										<input
											type='email'
											className='form-control'
											id='email'
											onChange={(event, value) =>
												handleInputFields(value, event.target.id)
											}
										/>
									</div>
								</div>
							</div>
							<input
								type='file'
								id='bidFile'
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
								<button
									className='btn btn-success'
									type='button'
									onClick={(event) => handleSubmit(event)}>
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
