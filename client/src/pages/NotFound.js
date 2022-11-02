import { Link } from 'react-router-dom';
import NotFound from '../resources/images/not-found.png';
import { useTitle } from 'react-use';

export default function NotFoundPage() {
	useTitle('Not Found');

	return (
		<div className='error-page'>
			<div className='error'>
				<img className='not-found-image' src={NotFound} alt='404' />
			</div>
			<div className='not-found-textbox'>
				<h2>There is nothing for you here</h2>
				<Link className='not-found-link' to='/'>
					Back to Home
				</Link>
			</div>
		</div>
	);
}
