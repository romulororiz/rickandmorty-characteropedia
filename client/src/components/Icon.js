import {
	FaSkullCrossbones,
	FaHeartbeat,
	FaQuestion,
	FaMale,
	FaRobot,
	FaPaw,
	FaPoop,
	FaVirus,
} from 'react-icons/fa';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { RiAliensFill, RiGenderlessLine } from 'react-icons/ri';
import { GiUnicorn } from 'react-icons/gi';

const Icon = ({ name }) => {
	switch (name) {
		case 'Dead':
			return <FaSkullCrossbones className='icon' />;
		case 'Alive':
			return <FaHeartbeat className='icon' />;
		case 'Unknown':
			return <FaQuestion className='icon' />;
		case 'Male':
			return <BsGenderMale className='icon' />;
		case 'Female':
			return <BsGenderFemale className='icon' />;
		case 'Genderless':
			return <RiGenderlessLine className='icon' />;
		case 'Human':
			return <FaMale className='icon' />;
		case 'Humanoid':
			return <FaMale className='icon' />;
		case 'Alien':
			return <RiAliensFill className='icon' />;
		case 'Mythological Creature':
			return <GiUnicorn className='icon' />;
		case 'Cronenberg':
			return <RiAliensFill className='icon' />;
		case 'Robot':
			return <FaRobot className='icon' />;
		case 'Animal':
			return <FaPaw className='icon' />;
		case 'Poopybutthole':
			return <FaPoop className='icon' />;
		case 'Disease':
			return <FaVirus className='icon' />;
		default:
			return <FaQuestion className='icon' />;
	}
};

export default Icon;
