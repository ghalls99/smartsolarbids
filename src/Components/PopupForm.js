import React, {useState, useRef, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css'; // Import a separate CSS file for styling the popup form
import {Check, Close} from '@mui/icons-material';
import axios from 'axios';
import {CircularProgress} from '@mui/material';

const PopupForm = ({showPopup, closePopup, didSubmit, isSuccess, submit}) => {
	const inputFile = useRef(null);
	const electricFile = useRef(null);
	const [inputFields, setInputFields] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [bidFile, setBidFile] = useState(false);
	const [eFileSubmit, setEfileSubmit] = useState(false);
	const [submitPress, setSubmitPress] = useState(false);

	useEffect(() => {
		if (submitPress) {
			handleSubmit();
		}
	}, [submitPress]);

	const didSubmitPress = () => {
		setSubmitPress(true);
	};
	const handleSubmit = async () => {
		didSubmit(false);
		isSuccess(false);

		console.log(bidFile[0].name);

		setIsLoading(true);

		const allFiles = [inputFile, electricFile || null];

		allFiles.filter((n) => n);

		const selectedFilesHTTP = [
			{
				name: bidFile[0].name || null,
				type: bidFile[0].type || null,
			},
		];

		if (eFileSubmit) {
			selectedFilesHTTP.push({
				name: eFileSubmit[0].name,
				type: eFileSubmit[0].type,
			});
		}

		if (bidFile[0]?.name) {
			// Create a new FormData object to send the file
			const data = {
				files: selectedFilesHTTP,
				...inputFields,
			};

			const params = {
				method: 'POST',
				url: `https://s7o03t61l7.execute-api.us-east-1.amazonaws.com/upload-file`,
				headers: {},
				data: data,
			};

			// Now you can send the formData object with the file via API
			// For example:
			try {
				const res = await axios(params);

				if (res.data?.urlData) {
					let index = 0;
					for (const urlData of res.data.urlData) {
						const options = {
							headers: {
								'Content-Type': urlData.type,
							},
						};

						await axios
							.put(urlData.signedUrl, data.files[index], options)
							.catch(function (error) {
								if (error.message || error.repsonse) {
									console.log(error?.message || error?.response);
									console.log(error?.response?.data);
									throw error;
								}
							});
						index = index + 1;
					}
				}
			} catch (error) {
				console.error(
					`We have encountered a fatal error:  ${JSON.stringify(error)}`,
				);
				setIsLoading(false);
				didSubmit(true);
				isSuccess(false);
				closePopup();

				return false;
			}
		}
		console.log('successful');
		setIsLoading(false);
		closePopup();
		didSubmit(true);
		isSuccess(true);
	};

	const handleInputFields = (event) => {
		const {id, value} = event.target;

		setInputFields({...inputFields, [id]: value});
	};
	const onBidClick = async () => {
		await inputFile.current.click();
	};

	const onElectricClick = async () => {
		await electricFile.current.click();
	};

	const onBidFileChange = (e) => {
		/*Selected files data can be collected here.*/
		setBidFile(e.target.files);
	};

	const onElectricFileChange = (e) => {
		setEfileSubmit(e.target.files);
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
									autoComplete='new-password'
									onChange={(event) => handleInputFields(event)}
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
									autoComplete='new-password'
									onChange={(event) => handleInputFields(event)}
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
									autoComplete='new-password'
									onChange={(event) => handleInputFields(event)}
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
									autoComplete='new-password'
									onChange={(event) => handleInputFields(event)}
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
									autoComplete='new-password'
									onChange={(event) => handleInputFields(event)}
								/>
							</div>
							<input
								type='file'
								id='bidFile'
								ref={inputFile}
								style={{display: 'none'}}
								onChange={onBidFileChange}
							/>
							<input
								type='file'
								id='electricFile'
								ref={electricFile}
								onChange={onElectricFileChange}
								style={{display: 'none'}}
							/>
							<div className='d-flex g-2 justify-content-center'>
								<div className='d-flex flex-column align-items-center mx-3'>
									<label className='text-start'>Current Bid*</label>
									{!bidFile ? (
										<button
											type='button'
											className='btn btn-primary mb-3 d-flex'
											onClick={(event) => onBidClick(event.target.id)}>
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
									{!eFileSubmit ? (
										<button
											type='button'
											className='btn btn-primary mb-3 d-flex'
											onClick={(event) => onElectricClick(event.target.id)}>
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
								While optional, for most accurate results, provide a monthly
								statement of your electric bill
							</p>

							<div className='d-grid gap-2'>
								<button
									className='btn btn-success'
									type='button'
									onClick={(event) => didSubmitPress(event)}>
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
