import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css'; // Import a separate CSS file for styling the popup form
import {Check, Close} from '@mui/icons-material';
import axios from 'axios';
import {CircularProgress} from '@mui/material';

const PopupForm = ({showPopup, closePopup, didSubmit, isSuccess}) => {
	const inputFile = useRef(null);
	const electricFile = useRef(null);
	const [inputFields, setInputFields] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const allFiles = [inputFile, electricFile || null];

		allFiles.filter((n) => n);

		const selectedFilesHTTP = {
			bidFile: {
				name: inputFile.current.files[0].name || null,
				type: inputFile.current.files[0].type || null,
			},
		};

		if (electricFile) {
			selectedFilesHTTP['electricFile'] = {
				name: electricFile.current.files[0].name,
				type: electricFile.current.files[0].type,
			};
		}

		if (selectedFilesHTTP?.bidFile?.name) {
			// Create a new FormData object to send the file
			const data = {
				...inputFields,
				files: selectedFilesHTTP,
			};

			const params = {
				method: 'POST',
				url: `https://dizzcxhi23.execute-api.us-east-1.amazonaws.com/upload-file`,
				headers: {},
				data: data,
			};

			// Now you can send the formData object with the file via API
			// For example:
			console.log('sending to URL ' + JSON.stringify(data));
			try {
				const res = await axios(params);

				console.log(JSON.stringify(res));

				if (res.data?.urlData) {
					let index = 0;
					for (const urlData in res.data.urlData) {
						const options = {
							headers: {
								'Content-Type': urlData.type,
							},
						};
						const response = await axios
							.put(urlData.signedUrl, data.files[index], options)
							.catch(function (error) {
								if (error.message || error.repsonse) {
									console.log(error?.message || error?.response);
									console.log(error?.response?.data);
								}
							});
						console.log(response); // Log the response from the PUT request
						index = index + 1;
					}
				}
			} catch (error) {
				console.error(`Error:  ${JSON.stringify(error)}`);
				setIsLoading(false);
				didSubmit(true);
				isSuccess(false);
				closePopup();
			}
		}
		setIsLoading(false);
		closePopup();
		didSubmit(true);
		isSuccess(true);
	};

	const handleInputFields = (value, id) => {
		setInputFields({...inputFields, [id]: value});
	};

	const onBidClick = async () => {
		inputFile.current.click();
	};

	const onElectricClick = async () => {
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
						<form onSubmit={handleSubmit} className='row g-3'>
							<div className='mb-3 col-6'>
								<label htmlFor='firstName' className='form-label'>
									First Name*
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
							<div className='mb-3 col-6'>
								<label htmlFor='lastName' className='form-label'>
									Last Name*
								</label>
								<input
									type='text col-6'
									className='form-control'
									id='lastName'
									onChange={(event, value) =>
										handleInputFields(value, event.target.id)
									}
								/>
							</div>
							<div className='mb-3 col-6'>
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

							<div className='mb-3 col-6'>
								<label htmlFor='email' className='form-label'>
									Email*
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
							<div className='mb-3 col-12'>
								<label htmlFor='email' className='form-label'>
									Electricity Cost (per month)
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
							<input
								type='file'
								id='bidFile'
								ref={inputFile}
								style={{display: 'none'}}
							/>
							<div className='d-flex g-2 justify-content-center'>
								<div className='d-flex flex-column align-items-center mx-3'>
									<label className='text-start'>Current Bid*</label>
									{!inputFile?.current?.files[0]?.name ? (
										<button
											type='button'
											id='bidFile'
											className='btn btn-primary mb-3 d-flex'
											onClick={onBidClick}>
											<p style={{margin: 0}}>Select File</p>
										</button>
									) : (
										<button
											type='button'
											className='btn btn-disabled-success mb-3 d-flex'
											disabled>
											<Check color='success' />
										</button>
									)}
								</div>
								<div className='d-flex flex-column align-items-center mx-3'>
									<label className='text-start'>Electric Bill</label>
									{!electricFile?.current?.files[0]?.name ? (
										<button
											type='button'
											id='electricBill'
											className='btn btn-primary mb-3 d-flex'
											onClick={onElectricClick}>
											<p style={{margin: 0}}>Select File</p>
										</button>
									) : (
										<button
											type='button'
											className='btn btn-disabled-success mb-3 d-flex'
											disabled>
											<Check color='success' />
										</button>
									)}
								</div>
							</div>
							<p className='mb-4'>
								For most accurate results provide a monthly statement of your
								electric bill
							</p>

							<div className='d-grid gap-2'>
								<button
									className='btn btn-success'
									type='button'
									onClick={(event) => handleSubmit(event)}>
									{isLoading ? (
										<CircularProgress color='inherit' />
									) : (
										<p style={{margin: '5px'}}>Send Your Bid</p>
									)}
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
