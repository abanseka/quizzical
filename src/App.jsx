import { useState, useEffect } from "react"
import axios from "axios"
import url from "./config/config"
import { nanoid } from "nanoid"

import blob1 from "./assets/blobs.svg"
import blob2 from "./assets/blobs (1).svg"

import helpers from "./components/helpers"
import Question from "./components/Question"
import Option from "./components/Option"
import Button from "./components/Button"

function App() {
	const [data, setData] = useState([])
	const [answers, setAnswers] = useState([])
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState(0)
	const [showResults, setShowResults] = useState(false)
	let [allOptions, setAllOptions] = useState()

	useEffect(() => {
		const fetchData = async link => {
			try {
				// debugger
				const req = await axios.get(link)
				const data = req.data.results
				setAnswers(helpers.setStateForAnswers(data))
				setQuestions(helpers.setStateForQuestions(data))
				setData(data)
			} catch (err) {
				throw new Error(err)
			}
		}
		fetchData(url)
	}, [])

	allOptions = [...helpers.generateStateForOptions(answers)]

	const checkAnswer = (event, ans, reference) => {
		const option = event.target
		option.style.backgroundColor = ans.isClicked ? "#D6DBF5" : "none"
		option.style.border = ans.isClicked && "none"

		reference.forEach(ref => {
			ans.option === ref.correct_answer && setScore(score + 1)
		})
	}

	const generateQnA = (questions, options, reference) =>
		questions.map((qn, qnID) => (
			<section className="question-answer" key={nanoid()}>
				<>
					<Question key={nanoid()} question={qn} />
					<ul className="options" key={nanoid()}>
						{options[qnID].map((ans, ansID) => (
							<Option
								key={nanoid()}
								option={ans.option}
								ID={ansID}
								handleClick={e => checkAnswer(e, ans, reference)}
							/>
						))}
					</ul>
				</>
			</section>
		))

	const toggleButton = () => setShowResults(!showResults)

	return (
		<div className="frame">
			<main className="app-container">
				<img src={blob1} className="blob blob2" />
				{generateQnA(questions, allOptions, data, setScore)}
				<img src={blob2} className="blob blob1" />
				<div className="results">
					<p>
						{showResults && (
							<span className="score">
								You scored {score}/{questions.length} correct answers
							</span>
						)}
						<Button
							label={showResults ? "Play again" : "Check Answer"}
							handleClick={toggleButton}
						/>
					</p>
				</div>
			</main>
		</div>
	)
}

export default App
