/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_CHARACTERS } from '../queries/characterQueries';
import CharItem from './CharItem';
import NotFound from '../resources/images/not-found.png';
import Spinner from './Spinner';
import { status, gender, species } from '../config';

const Results = () => {
	const [term, setTerm] = useState('');
	const [charStatus, setCharStatus] = useState('');
	const [charGender, setCharGender] = useState('');
	const [charSpecies, setCharSpecies] = useState('');
	const [charData, setCharData] = useState(null);
	const [next, setNext] = useState(null);
	const [results, setResults] = useState(null);
	const [noData, setNoData] = useState(false);

	const { loading, error, data } = useQuery(GET_CHARACTERS, {
		variables: {
			name: term,
			status: charStatus,
			gender: charGender,
			species: charSpecies,
		},
	});

	// Search delay
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			setCharData(data);
		}, 200);

		return () => clearTimeout(delayDebounceFn);
	}, [data, term]);

	useEffect(() => {
		if (charData) {
			setNext(charData.characters.info.next);
			setResults(charData.characters.results);
		}
	}, [charData]);

	// Infinite Scroll
	useEffect(() => {
		window.onscroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight
			) {
				if (next !== null) {
					getNextCharacters(next);
				} else {
					setNoData(true);
				}
			}
		};
	}, [next, results, term]);

	console.log(noData);

	// Get next characters for infinite scroll
	const getNextCharacters = endpoint => {
		fetch(endpoint)
			.then(response => response.json())
			.then(data => {
				console.log('Success:', data);
				const newResults = results.concat(data.results);
				setResults(newResults);
				setNext(data.info.next);
				if (data.length === 0) setNoData(true);
				if (data.results.length < 20) setNoData(true);
				if (data.info.next === null) setNoData(true);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const onClickHandler = () => {
		setTerm('');
		setCharStatus('');
		setCharGender('');
		setCharSpecies('');
	};

	return (
		<div className='container'>
			<div className='search-wrapper'>
				<div className='input-wrapper'>
					<label className='form-label'>Name</label>
					<input
						className='search-input'
						type='text'
						value={term}
						onChange={e => setTerm(e.target.value)}
						placeholder='E.g Rick Sanchez'
					/>
				</div>
				<div className='form-select-wrapper'>
					<div className='form-group'>
						<label className='form-label'>Status</label>
						<select
							className='form-select'
							name='status'
							value={charStatus}
							onChange={e => setCharStatus(e.target.value)}
						>
							<option value=''>Status</option>
							{status.map(st => (
								<option key={st.name} value={st.name}>
									{st.name}
								</option>
							))}
						</select>
					</div>
					<div className='form-group'>
						<label className='form-label'>Gender</label>
						<select
							className='form-select'
							name='gender'
							value={charGender}
							onChange={e => setCharGender(e.target.value)}
						>
							<option value=''>Gender</option>
							{gender.map(gd => (
								<option key={gd.name} value={gd.name}>
									{gd.name}
								</option>
							))}
						</select>
					</div>
					<div className='form-group'>
						<label className='form-label'>Species</label>
						<select
							className='form-select'
							name='species'
							value={charSpecies}
							onChange={e => setCharSpecies(e.target.value)}
						>
							<option value=''>Species</option>
							{species.map(sp => (
								<option key={sp.name} value={sp.name}>
									{sp.name}
								</option>
							))}
						</select>
					</div>
				</div>
				<button onClick={onClickHandler} className='clear-btn'>clear</button>
			</div>
			<span className='count'>
				{!error && results
					? term === ''
						? `${charData && charData.characters.info.count} results`
						: `${
								charData && charData.characters.info.count
						  } results for '${term}'`
					: ''}
			</span>
			<div className='grid'>
				{!error &&
					results &&
					results.map(character => (
						<CharItem key={character.id} character={character} />
					))}
			</div>
			{loading && <Spinner />}
			{error && (
				<div className='not-found'>
					<h4>
						No Search Results for <strong>'{term}'</strong>
					</h4>
					<h4>
						Are you f*cking serious? How hard can it.. <span>buurp</span> ..be?{' '}
					</h4>
					<img src={NotFound} alt='Not Found' />
				</div>
			)}
			{noData && <h3 style={{ marginTop: 30 }}>That's all</h3>}
		</div>
	);
};
export default Results;
