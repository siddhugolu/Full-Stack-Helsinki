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
			<>
		      <td> {text} </td> 
		      <td> {value} </td>
		    </>
	)
}

const Statistics = ({good, neutral, bad, query}) => {
	const total = good + neutral + bad
	const posPercent = good*100/total + ' %'
	if(total === 0) {
		return (
			<>
			<tr>
			  <td> No feedback given </td>
			</tr>
			</>
		)
	}

	else {

		return (
			
			
			<>
			  <tr>
			    <Statistic value={good} text='Good' />
			  </tr>
			  <tr>
			    <Statistic value={neutral} text='Neutral' />
			  </tr>
			  <tr>
			    <Statistic value={bad} text='Bad' />
			  </tr>
			  <tr>
			    <Statistic value={total} text='All' />
			  </tr>
			  <tr>
			    <Statistic value={(good - bad)/total} text='Average' />
			  </tr>
			  <tr>
			    <Statistic value={posPercent} text='Positive' />
			  </tr>
			</>
			
			
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
		  <table>
		    <tbody>
		      <Statistics good={good} neutral={neutral} bad={bad} />
		    </tbody>
		  </table>

		</div>
	)
}


ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
