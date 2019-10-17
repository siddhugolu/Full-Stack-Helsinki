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

const Compute = ({good, neutral, bad, query}) => {
	if(query === 'avg') {
		return (
			<div>
			  Average: {(good - bad)/(good + neutral + bad)}
			</div>
		)
	}

	return (
		<div>
		  Positive: {good*100/(good + neutral + bad)} %
		</div>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
		setAll(all + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
		setAll(all + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
		setAll(all + 1)
	}

	return (
		<div>
		  <h1> Give Feedback </h1>
		  <Button onClick={handleGood} text='Good' />
		  <Button onClick={handleNeutral} text='Neutral' />
		  <Button onClick={handleBad} text='Bad' />

		  <h2> Statistics </h2>
		  <Display value={good} text="Good" />
		  <Display value={neutral} text="Neutral" />
		  <Display value={bad} text="Bad" />
		  <Display value={all} text="All" />
		  <Compute good={good} neutral={neutral} bad={bad} query='avg' />
		  <Compute good={good} neutral={neutral} bad={bad} query='Positive' />

		</div>
	)
}


ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
