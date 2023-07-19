import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Construction, PriceCheck, CropSquare, Key} from '@mui/icons-material';

const Section = () => {
	return (
		<div className='container my-5 '>
			<h2 className='text-start mb-4'>Our Effective Bidding Strategy</h2>
			<div className='row'>
				<div className='col-md-6 mb-4'>
					<div className='card border-0'>
						<div className='card-header d-flex align-items-center bg-transparent border-0'>
							<PriceCheck color='primary' fontSize='large' />
							<h4 className='card-title border-0 mx-2'>Fair Pricing:</h4>
						</div>
						<div className='card-body text-start'>
							<p>
								Solar investments can be complex. We help you unravel all the
								costs involved - installation, maintenance, and potential
								upgrades - so you know you're getting a fair deal
							</p>
						</div>
					</div>
				</div>
				<div className='col-md-6 mb-4'>
					<div className='card border-0'>
						<div className='card-header d-flex align-items-center bg-transparent border-0'>
							<Construction color='primary' fontSize='large' />
							<h4 className='card-title mx-2'>Quality of Equipment:</h4>
						</div>
						<div className='card-body text-start'>
							<p>
								Quality and efficiency go hand-in-hand. We'll help you
								understand the type of panels and inverters proposed, their
								efficiency, and what warranties are in place.
							</p>
						</div>
					</div>
				</div>
				<div className='col-md-6 mb-4'>
					<div className='card border-0'>
						<div className='card-header d-flex align-items-center bg-transparent border-0'>
							<CropSquare color='primary' fontSize='large' />
							<h4 className='card-title mx-2'>System Size and Output:</h4>
						</div>
						<div className='card-body text-start'>
							<p>
								Your solar installation should be the right fit for your home.
								We ensure the proposed size and expected output match your needs
								and that you know how much of your electricity bill it could
								offset.
							</p>
						</div>
					</div>
				</div>
				<div className='col-md-6 mb-4'>
					<div className='card border-0'>
						<div className='card-header d-flex align-items-center bg-transparent border-0'>
							<Key color='primary' fontSize='large' />
							<h4 className='card-title mx-2'>Installer Credentials:</h4>
						</div>
						<div className='card-body text-start'>
							<p>
								Knowing who's installing your solar system is just as important
								as what's being installed. We check the qualifications,
								certifications, and experience of your installer so you can be
								confident in their skills.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Section;
