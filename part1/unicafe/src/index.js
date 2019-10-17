import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Button = ({onClick, text}) => (
	<button onClick={onClick}> {text} </button>
)

const Display = ({value, text}) => {
	return (
		<div>
		  {text}: {value}
		</div>
	)
}

const Statistics = ({good, neutral, bad, query}) => {
	if(query === 'avg') {
		return (
			<div>
			  Average: {(good - bad)/(good + neutral + bad)}
			</div>
		)
	}

	else if(query === 'pos') {
			return (
			<div>
			  Positive: {good*100/(good + neutral + bad)} %
			</div>
		)
	}

	else {

		return (
			<div>
			  <Display value={good} text='Good' />
			  <Display value={neutral} text='Neutral' />
			  <Display value={bad} text='Bad' />
			  <Display value={good+neutral+bad} text='All' />
			</div>
		)
	}
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	

	const handleGood = () => {
		setGood(good + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
	}

	return (
		<div>
		  <h1> Give Feedback </h1>
		  <Button onClick={handleGood} text='Good' />
		  <Button onClick={handleNeutral} text='Neutral' />
		  <Button onClick={handleBad} text='Bad' />

		  <h2> Statistics </h2>
		  <Statistics good={good} neutral={neutral} bad={bad} query=' ' />
		  <Statistics good={good} neutral={neutral} bad={bad} query='avg' />
		  <Statistics good={good} neutral={neutral} bad={bad} query='pos' />

		</div>
	)
}


ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
