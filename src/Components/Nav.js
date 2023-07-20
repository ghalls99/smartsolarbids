import React, {useState, useEffect} from 'react';
import logo from '../images/logo.png';

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > 50) {
				if (!scrolled) {
					setScrolled(true);
				}
			} else {
				if (scrolled) {
					setScrolled(false);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [scrolled]);

	return (
		<nav
			className={`navbar navbar-expand-md navbar-light sticky-top${
				scrolled ? ' scrolled' : ''
			} bg-white shadow-sm`}>
			<div className='container'>
				<a className='navbar-brand' href='#'>
					<img src={logo} alt='Logo' className='logo' width={50} />
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div
					className='collapse navbar-collapse justify-content-end align-items-center'
					id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item p-4'>
							<a className='nav-link' href='#'>
								Home
							</a>
						</li>
						<li className='nav-item p-4'>
							<button className='btn btn-primary'>Get a Bid</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
