import React, {useEffect, useRef, useState} from 'react';

const Questions = ({
	questions,
	handleAnswerSelect,
	currentQuestion,
	isRequired,
	isDisabled,
	setIsDisabled,
	setFile,
}) => {
	const inputFile = useRef(null);
	const [inputSection, setInputSection] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		console.log(questions[currentQuestion]);
		if (questions[currentQuestion].type === 'file') {
			console.log('here');
			setInputSection(true);
		} else {
			setInputSection(false);
		}
		// Clear the input value whenever the question changes
		setInputValue('');
	}, [currentQuestion, questions]);

	const onElectricFileChange = (e) => {
		handleAnswerSelect({
			name: e.target.files[0].name,
			type: e.target.files[0].type,
		});
		setFile(e.target.files[0]);
	};

	const onInputChange = (e) => {
		setIsDisabled(false);
		setInputValue(e.target.value);
	};

	const onButtonClick = () => {
		inputFile.current.click();
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleAnswerSelect(inputValue);
		}
	};

	return (
		<div className='row g-2 my-5'>
			<div className=''>
				<h1 className='text-center'>
					{questions[currentQuestion].questionText}
				</h1>
			</div>
			<div className='d-flex justify-content-center'>
				{isRequired && inputValue === '' && (
					<p style={{color: 'red', margin: 0}}>
						Please fill in the required field.
					</p>
				)}
			</div>
			<div className='d-flex justify-content-center'>
				{inputSection ? (
					<div>
						<input
							type='file'
							id='electricFile'
							ref={inputFile}
							onChange={onElectricFileChange}
							style={{display: 'none'}}
						/>
						<button className='btn btn-primary' onClick={onButtonClick}>
							Select File
						</button>
					</div>
				) : (
					<input
						id={questions[currentQuestion].id}
						value={inputValue}
						onChange={onInputChange}
						onKeyDown={handleKeyDown} // Add keyDown event listener
						style={{borderColor: isRequired && inputValue === '' ? 'red' : ''}}
					/>
				)}
			</div>
			<div className='d-flex justify-content-center'>
				<button
					className='btn btn-success col-2'
					onClick={() => handleAnswerSelect(inputValue)}
					disabled={isDisabled}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Questions;
