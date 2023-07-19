import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Components.css';
import heroImage from '../images/portraitHero.jpg';
import {Slider} from '@mui/material';
import NumberSpinner from './NumberSpinner';

const Hero = () => {
	const [homeSize, setHomeSize] = useState(0);
	const [disabled, setIsDisabled] = useState(true);
	const [previousHomeSize, setPreviousHomeSize] = useState(0);

	const handleSliderValue = (value) => {
		console.log(value);
		setPreviousHomeSize(homeSize);
		setHomeSize(value);
		setIsDisabled(false);
	};

	return (
		<div className='container my-5'>
			<div className='row justify-content-center align-items-center'>
				<div className='col-md-8 col-lg-6 text-center'>
					<div className='hero-text mx-5'>
						<h1 className='fs-1'>Get the right bid.</h1>
						<h1 className='fs-1' style={{color: '#3E5C8D'}}>
							<strong>You could be saving</strong>
						</h1>
						<p className='display-3'>
							<strong>
								<NumberSpinner
									startValue={previousHomeSize}
									endValue={homeSize}
									isDisabled={disabled}
									setIsDisabled={setIsDisabled}
									setStartValue={setHomeSize}
								/>
							</strong>
						</p>
						<Slider
							defaultValue={70}
							aria-label='Small'
							valueLabelDisplay='auto'
							min={1000}
							max={5000}
							width='50%'
							onChangeCommitted={(event, value) => handleSliderValue(value)}
						/>
						<p className='fs-6'>Upload your bid to see what you qualify for</p>
						<button type='button' className='btn btn-primary'>
							Upload Your Bid
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
			<div className='row d-lg-none'>
				<div className='col-12 text-center' style={{margin: '20px 0'}}>
					<img
						src={heroImage}
						alt='Hero'
						className='image-hero'
						style={{borderRadius: '16px', width: '100%', height: 'auto'}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
