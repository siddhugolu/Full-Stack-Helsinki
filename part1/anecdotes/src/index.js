import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const App = (props) => {
	const [selected, setSelected] = useState(0)

	const value = Math.floor(Math.random() * (props.anecdotes.length))
	console.log(value)

	return (
		<div>
		  {props.anecdotes[selected]}
		  <p>
		    <button onClick={() => setSelected(value)}> Click for the next anecdote </button>
		  </p>
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
