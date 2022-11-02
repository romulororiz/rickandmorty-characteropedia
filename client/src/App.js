import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollTop from './components/ScrollTop';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</Router>
			<Footer />
			<ScrollTop />
		</>
	);
}

export default App;
