import Icon from './Icon';

const CharItem = ({ character }) => {
	return (
		<div className='card'>
			<img
				className='card-image'
				src={character.image}
				alt={character.name}
				loading='lazy'
			/>
			<div className='text-box'>
				<h2>{character.name}</h2>
				<div className='info-heading'>
					<span>
						<Icon name={character.status} />
						<p>{character.status}</p>
					</span>
					<span>
						<Icon name={character.gender} />
						<p>{character.gender}</p>
					</span>
					<span>
						<Icon name={character.species} />
						<p>
							{character.species === 'Mythological Creature'
								? 'Mythological'
								: character.species}
						</p>
					</span>
				</div>

				<div className='last-location'>
					<h4>
						Last known location: <br />
						<span>{character.location.name}</span>
					</h4>
				</div>

				<div className='first-seen'>
					<h4>First seen:</h4>
					<a target='_blank' href={character.episode[0]} rel='noreferrer'>
						{character.episode[0]}
					</a>
				</div>
			</div>
		</div>
	);
};

export default CharItem;
