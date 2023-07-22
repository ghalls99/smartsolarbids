import './App.css';
import Hero from './Components/Hero';
import LargeCard from './Components/LargeCard';
import Nav from './Components/Nav';
import Section from './Components/Section';
import Footer from './Components/Footer';
import Toast from './Components/Toast';
import {useState} from 'react';

function App() {
	const [submit, didSubmit] = useState(false);
	const [success, isSuccess] = useState(false);
	return (
		<div className='App'>
			<Nav />
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

export default App;
