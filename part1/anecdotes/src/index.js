import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const MaxQuote = ({votes, anecdotes}) => {
	let max = votes[0]
	let max_i = 0
	for(let i = 1; i<votes.length; i++) {
		if(votes[i] > max) {
			max = votes[i]
			max_i = i
		}
	}

	return (
		<div>
		  {anecdotes[max_i]}
		  <p> This quote has {max} votes </p>
		</div>
	)
}

const App = (props) => {
	let [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
	
	const value = Math.floor(Math.random() * (props.anecdotes.length))

	selected = value

	const handleVote = () => {
		const newVotes = [...votes]
		newVotes[selected] += 1
		setVotes(newVotes)
	}
	
	console.log(votes)
	console.log(selected)
	return (
		<div>
		<h1> Anecdote of the Day! </h1>
		<>
		  {props.anecdotes[selected]}
		</>
		  <p> This quote has {votes[selected]} votes </p>
		  <p>
		    <button onClick={handleVote}> Vote </button>
		    <button onClick={() => setSelected(selected)}> Click for the next anecdote </button>
		  </p>

		<h2> Anecdote with most votes </h2>
		<MaxQuote votes={votes} anecdotes={props.anecdotes} />
		</div>
	)
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'The best way to get a project done faster is to start sooner.',
  'Plan to throw one (implementation) away; you will, anyhow.',
  'Every good work of software starts by scratching a developer\'s personal itch.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
