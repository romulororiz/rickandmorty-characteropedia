import { useTitle } from 'react-use';
import Results from '../components/Results';
import Showcase from '../components/Showcase';

const Home = () => {
	useTitle('Rick and Morty | Characteropedia');

	return (
		<>
			<Showcase />
			<Results />
		</>
	);
};
export default Home;
