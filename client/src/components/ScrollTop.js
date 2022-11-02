import React, { useState, useEffect } from 'react';

const ScrollTop = () => {
	const [showGoTop, setShowGoTop] = useState(false);
	const [btnStyle, setBtnStyle] = useState('scrollTop-hidden');

	// Scroll to top
	const scrollToTop = () => {
		if (typeof window !== 'undefined') {
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	};

	// Show Button when reached a certain amount of pixels
	const handleVisible = () => {
		if (typeof window !== 'undefined') {
			// returns a boolean
			setShowGoTop(window.scrollY > 350);
		}
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleVisible);
		}

		if (showGoTop) {
			setBtnStyle('scrollTop');
		} else {
			setBtnStyle('scrollTop-hidden');
		}
	}, [showGoTop]);

	return (
		<>
			<button className={btnStyle} onClick={() => scrollToTop()}>
				<span className='tooltip'>Go up</span>
			</button>
		</>
	);
};

export default ScrollTop;
