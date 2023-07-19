import './App.css';
import Hero from './Components/Hero';
import LargeCard from './Components/LargeCard';
import Nav from './Components/Nav';
import Section from './Components/Section';
import Footer from './Components/Footer';

function App() {
	return (
		<div className='App'>
			<Nav />
			<Hero />
			<Section />
			<LargeCard />
			<Footer />
		</div>
	);
}

export default App;
