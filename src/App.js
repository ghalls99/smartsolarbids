import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/quiz' element={<Quiz />} />
			</Routes>
		</Router>
	);
}

export default App;
