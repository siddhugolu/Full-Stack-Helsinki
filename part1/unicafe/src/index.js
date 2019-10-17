import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Button = ({onClick, text}) => (
	<button onClick={onClick}> {text} </button>
)

const Statistic = ({value, text}) => {
	return (
		<div>
		  {text}: {value}
		</div>
	)
}

const Statistics = ({good, neutral, bad, query}) => {
	const total = good + neutral + bad
	const posPercent = good*100/total + ' %'
	if(total === 0) {
		return (
			<div>
			  No feedback given
			</div>
		)
	}

	else {

		return (
			<div>
			    <Statistic value={good} text='Good' />
			    <Statistic value={neutral} text='Neutral' />
			    <Statistic value={bad} text='Bad' />
			    <Statistic value={total} text='All' />
			    <Statistic value={(good - bad)/total} text='Average' />
			    <Statistic value={posPercent} text='Positive' />
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
		  <Statistics good={good} neutral={neutral} bad={bad} />

		</div>
	)
}


ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
