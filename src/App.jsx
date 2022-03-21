import { useState, useEffect } from "react"
import axios from "axios"
import { nanoid } from "nanoid"
import url from "./config/config"
import blob1 from "./assets/blobs.svg"
import blob2 from "./assets/blobs (1).svg"
import Button from "./components/Button"

function App() {
	const [data, setData] = useState([])
	const [showScore, setShowScore] = useState(true)

	useEffect(() => {
		;(async link => {
			const req = await axios.get(link)
			setData(req.data.results)
		})(url)
	}, [])

	const toggleScore = () => setShowScore(!showScore)

	const setScoreDisplayButton = (() => {
		// prettier-ignore
		return (
			showScore 
			? <Button label={"Check answers"} handleClick={toggleScore} />
			: <p>
					<span className="score">You scored 3/5 correct answers</span>
					<Button label={"play again"} handleClick={toggleScore} />
				</p>
		)
	})()

	// generate static page
	const qandA = [
		{
			question: "How would one say goodbye in Spanish?",
			answers: ["Adios", "Hola", "Au Revior", "Saturn"]
		},
		{
			question: "What is the hottest plannet in our Solar system?",
			answers: ["Mecury", "Venus", "Mars", "Salir"]
		},
		{
			question: "How many hearts does an octopus have?",
			answers: ["One", "Two", "Three", "Four"]
		},
		{
			question:
				"Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?",
			answers: ["Cabbage Patch kids", "Transformers", "Rubik's Cube", "Care Bears"]
		},
		{
			question: "In which country was the caesar salad invented?",
			answers: ["Italy", "Portugal", "Mexico", "France"]
		}
	]

	// prettier-ignore
	const generateQuestionAndAnswers = (() =>
		qandA.map(qna => (
			<section className="question-answer" key={nanoid()}>
				<h3 className="question" key={nanoid()}>{qna.question}</h3>
				<ul className="options">
					{qna.answers.map(ans => (
						<button
							className="option"
							key={nanoid()}
							onClick={() => console.log("clicked")}
						>
							{ans}
						</button>
					))}
				</ul>
			</section>
		)))()

	return (
		<div className="frame">
			<main className="app-container">
				<img src={blob1} className="blob blob2" />
				{generateQuestionAndAnswers}
				<img src={blob2} className="blob blob1" />
				<div className="results">{setScoreDisplayButton}</div>
			</main>
		</div>
	)
}

export default App
