import '../App.css';
import Hero from '../Components/Hero';
import LargeCard from '../Components/LargeCard';
import Section from '../Components/Section';
import Footer from '../Components/Footer';
import Toast from '../Components/Toast';
import {useState} from 'react';
import Navbar from '../Components/Nav';
function Home() {
	const [submit, didSubmit] = useState(false);
	const [success, isSuccess] = useState(false);

	return (
		<div className='App'>
			<Navbar />
			<Toast
				submit={submit}
				didSubmit={didSubmit}
				success={success}
				isSuccess={isSuccess}
			/>
			<Hero didSubmit={didSubmit} submit={submit} isSuccess={isSuccess} />
			<Section />
			<LargeCard />
			<Footer />
		</div>
	);
}

export default Home;
