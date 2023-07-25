import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css';
import heroImage from '../images/portraitHero.jpg';
import {Slider} from '@mui/material';
import NumberSpinner from './NumberSpinner';
import PopupForm from './PopupForm';
import {Info} from '@mui/icons-material';

const Hero = ({didSubmit, submit, isSuccess}) => {
	const [savings, setSavings] = useState(0);
	const [disabled, setIsDisabled] = useState(true);
	const [previousHomeSize, setPreviousHomeSize] = useState(99 + 1500);
	const [showPopup, setShowPopup] = useState(false);

	const handleSliderValue = (value) => {
		setPreviousHomeSize(0);
		setIsDisabled(false);

		calculateSolarSavings(value, 19000);
	};

	function calculateSolarSavings(monthlyElectricBill, systemCost) {
		const monthsInYear = 12;
		const taxCreditPercentage = 0.3;
		const loanPeriodYears = 15;
		const interestRate = 0.05;

		const systemCostAfterTaxCredit = systemCost * (1 - taxCreditPercentage);

		const loanAmount = systemCostAfterTaxCredit;

		const newLoanAmountPerYear =
			loanAmount *
			((interestRate * Math.pow(1 + interestRate, loanPeriodYears)) /
				(Math.pow(1 + interestRate, loanPeriodYears) - 1));

		// Calculate the net annual savings with the solar system
		const annualSavings =
			monthlyElectricBill * monthsInYear - newLoanAmountPerYear;

		setSavings(annualSavings + 1500);
	}

	const openPopup = () => {
		setShowPopup(true);
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className='container my-2 my-md-5'>
			<div className='row justify-content-center align-items-center'>
				<div className='col-md-8 col-lg-6 text-center py-5 py-lg-0'>
					<div className='hero-text mx-5'>
						<h1 className='fs-1'>Scam-proof your bid.</h1>
						<h1 className='fs-1' style={{color: '#3E5C8D'}}>
							<strong>You could save</strong>
						</h1>
						<div className='d-flex justify-content-center'>
							<p className='display-3 mx-2'>
								<strong>
									<NumberSpinner
										startValue={previousHomeSize}
										endValue={savings}
										isDisabled={disabled}
										setIsDisabled={setIsDisabled}
										setStartValue={setSavings}
									/>
								</strong>
							</p>
							<p className='fs-1 mt-lg-4' style={{margin: '0px'}}>
								<em>on your bid</em>
							</p>
						</div>

						<Slider
							defaultValue={70}
							aria-label='Small'
							valueLabelDisplay='auto'
							min={115}
							max={500}
							width='50%'
							onChangeCommitted={(event, value) => handleSliderValue(value)}
						/>
						<div className='d-flex mb-3 justify-content-center'>
							<Info color='disabled' fontSize='small' />
							<p className='fs-6 mx-lg-2 mx-md-0' style={{margin: 0}}>
								Savings price based off your average monthly electric bill
							</p>
						</div>

						<button
							type='button'
							className='btn btn-primary'
							onClick={openPopup}>
							Send Your Bid
						</button>
					</div>
				</div>
				<div className='col-lg-6 d-none d-lg-block'>
					<div className='hero-image' style={{margin: '20px 0'}}>
						<img
							src={heroImage}
							alt='Hero'
							className='img-fluid'
							style={{borderRadius: '16px', width: '80%', height: 'auto'}}
						/>
					</div>
				</div>
			</div>
			<PopupForm
				submit={submit}
				showPopup={showPopup}
				closePopup={closePopup}
				didSubmit={didSubmit}
				isSuccess={isSuccess}
			/>
		</div>
	);
};

export default Hero;
