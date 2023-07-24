import React, {useEffect, useState} from 'react';
import Navbar from './Nav';
import Questions from './Questions';
import {useNavigate} from 'react-router';
import axios from 'axios';

const questions = [
	{
		id: 'firstName',
		questionText: 'What is your first name?',
		required: true,
	},
	{
		id: 'lastName',
		questionText: 'What is your last name?',
		required: true,
	},
	{
		id: 'homeSize',
		questionText: 'What is the square footage of your home?',
		required: true,
	},
	{
		id: 'utilityProvider',
		questionText: 'Who is your utility provider?',
	},
	{
		id: 'electricBill',
		questionText: 'Upload your average electric bill (optional)',
		type: 'file',
	},
	{
		id: 'averageElectricCost',
		questionText: 'what is your average cost for electricity per month?',
		required: true,
	},
	{
		id: 'email',
		questionText: 'What is your email address?',
		required: true,
		type: 'email',
	},
	{
		id: 'phoneNumber',
		questionText: 'What is your phone number?',
		required: true,
	},
];

const Quiz = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState({});
	const [isRequired, setIsRequired] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [end, setEnd] = useState(false);
	const [file, setFile] = useState(null);
	const [finalAnswers, setFinalAnswers] = useState({});

	useEffect(() => {
		setFinalAnswers({...answers});
		console.log(`final answers ${JSON.stringify(finalAnswers)}`);
	}, [answers]);

	const handleAnswerSelect = (value) => {
		if (questions[currentQuestion]?.required && !value) {
			setIsRequired(true);
			setIsDisabled(true);
			return;
		}

		if (questions[currentQuestion].type === 'email') {
			console.log('here');
			const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
			const validEmail = emailRegex.test(value);
			if (!validEmail) {
				setIsRequired(true);
				setIsDisabled(true);
				return;
			}
		}
		const key = questions[currentQuestion].id;
		const currentAnswer = {
			[key]: value,
		};
		setAnswers({...answers, ...currentAnswer});
		console.log(`answers ${JSON.stringify(answers)}`);

		// Move to the next question
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion((prev) => prev + 1);
		} else {
			setEnd(true);
			handleSendingInputData();
		}

		setIsRequired(false);
		setIsDisabled(false);
	};

	const handleSendingInputData = async () => {
		setFinalAnswers({...answers});
		console.log(`final answers ${JSON.stringify(finalAnswers)}`);
		await sendQuizToUrl();
	};

	const sendQuizToUrl = async () => {
		const params = {
			method: 'POST',
			url: `https://s7o03t61l7.execute-api.us-east-1.amazonaws.com/upload-quiz-data`,
			headers: {},
			data: finalAnswers,
		};
		const res = await axios(params);
		console.log(JSON.stringify(res.data));

		if (res.data?.signedUrl !== 'no-url-required') {
			const options = {
				headers: {
					'Content-Type': res.data.type,
				},
			};
			await axios
				.put(res.data.signedUrl, file, options)
				.catch(function (error) {
					if (error.message || error.repsonse) {
						console.log(error?.message || error?.response);
						console.log(error?.response?.data);
						throw error;
					}
				});
		}
	};

	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate('/');
	};

	return (
		<div>
			<Navbar />
			{!end ? (
				<Questions
					isDisabled={isDisabled}
					setIsDisabled={setIsDisabled}
					isRequired={isRequired}
					questions={questions}
					handleAnswerSelect={handleAnswerSelect}
					currentQuestion={currentQuestion}
					setFile={setFile}
				/>
			) : (
				<div className='text-center m-4'>
					<h1>
						That's it! We'll contact you as soon as possible with more updates
						on your bid.
					</h1>
					<button className='btn btn-success' onClick={handleSubmit}>
						Return to homepage
					</button>
				</div>
			)}
		</div>
	);
};

export default Quiz;
