import React, {useEffect, useState} from 'react';
import {Toast} from 'react-bootstrap';
import {CheckCircleOutline, Dangerous} from '@mui/icons-material';
import './Components.css'; // Import the CSS file for custom styles

const CustomToast = ({submit, didSubmit, success, isSuccess}) => {
	const [show, setShow] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [message, setMessage] = useState('');
	const [headerText, setheaderText] = useState(false);

	useEffect(() => {
		if (submit) {
			if (success) {
				setMessage(
					'Watch your email or your phone number for further updates on your bid review status',
				);
				setheaderText('Error');
			} else {
				setMessage('Unable to upload bid. Please try again later.');
				setheaderText('Error');
			}
			setShow(true);
			setSubmitted(true);
			const timeout = setTimeout(() => {
				setShow(false);
			}, 5000);
			return () => clearTimeout(timeout);
		} else {
			// If submit is false and there was a previous submission (submitted === true), hide the toast
			if (submitted) {
				setShow(false);
				setSubmitted(false);
				didSubmit(false);
			}
		}
		if (!setShow) {
			didSubmit(false);
			isSuccess(false);
		}
	}, [submit, submitted, didSubmit, success, isSuccess]);

	const handleClose = () => {
		setShow(false);
	};

	return (
		<Toast
			show={show}
			onClose={handleClose}
			className={show ? 'toast-enter' : 'toast-exit'} // Apply the corresponding CSS class based on the toast state
			style={{
				position: 'fixed',
				top: 'calc(20px + 120px)',
				right: '20px',
				backgroundColor: success ? 'green' : 'red',
				color: '#fff',
				zIndex: 9999,
			}}>
			<Toast.Header>
				<div className='d-flex justify-content-between align-items-center w-100'>
					<div>
						{isSuccess ? (
							<CheckCircleOutline color='inherit' />
						) : (
							<Dangerous color='inherit' />
						)}

						<strong className='mr-auto'>{headerText}</strong>
					</div>
				</div>
			</Toast.Header>
			<Toast.Body>{message}</Toast.Body>
		</Toast>
	);
};

export default CustomToast;
