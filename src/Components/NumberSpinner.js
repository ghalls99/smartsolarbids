import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

const NumberSpinner = ({
	startValue,
	endValue,
	isDisabled,
	setIsDisabled,
	setStartValue,
}) => {
	const spanRef = useRef(null);
	const [internalDisable, setInternalDisable] = useState(true);
	const [value, setValue] = useState(startValue);

	useEffect(() => {
		if (!isDisabled) {
			setInternalDisable(isDisabled);
			let currentValue = startValue;
			const increment = (endValue - startValue) / 50; // Number of steps

			const timer = setInterval(() => {
				currentValue += increment;
				if (Math.abs(currentValue - endValue) < Math.abs(increment)) {
					currentValue = endValue;
					clearInterval(timer);
					setIsDisabled(true);
					setStartValue(endValue);
				}
				setValue(Math.round(currentValue));
			}, 10);

			return () => clearInterval(timer);
		}
	}, [isDisabled, setIsDisabled, setStartValue, startValue, endValue]);

	return (
		<NumberSpinnerSpan ref={spanRef} isDisabled={internalDisable}>
			${value}
		</NumberSpinnerSpan>
	);
};

export default NumberSpinner;

const NumberSpinnerSpan = styled.span``;
