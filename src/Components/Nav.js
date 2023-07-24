import React, {useState} from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuToggle = () => {
		setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
	};

	return (
		<nav className='navbar navbar-expand-md navbar-light bg-light sticky-top'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					{/* Use Link instead of anchor tag for internal navigation */}
					<img src={logo} alt='Logo' width={50} />
				</Link>
				<button
					className={`navbar-toggler${isMenuOpen ? ' collapsed' : ''}`}
					type='button'
					aria-controls='navbarNav'
					aria-expanded={isMenuOpen ? 'true' : 'false'}
					aria-label='Toggle navigation'
					onClick={handleMenuToggle}>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className={`collapse navbar-collapse justify-content-end ${
						isMenuOpen ? 'show' : ''
					}`} // Add space between class names
					id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item mt-lg-2'>
							{/* Use Link instead of anchor tag for internal navigation */}
							<Link className='nav-link' to='/'>
								Home
							</Link>
						</li>
						<li className='nav-item m-2'>
							{/* Use Link instead of anchor tag for internal navigation */}
							<Link to='/quiz'>
								<button className='btn btn-primary'>Get a bid</button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
