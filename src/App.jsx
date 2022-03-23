import { useState, useEffect } from "react"
import axios from "axios"
import url from "./config/config"

import blob1 from "./assets/blobs.svg"
import blob2 from "./assets/blobs (1).svg"

import helpers from "./components/helpers"
import IntroPage from "./components/IntroPage"
import Quizz from "./components/Quizz"
import Button from "./components/Button"

function App() {
	const [start, setStart] = useState(false)
	const [render, setRender] = useState(true)
	const [data, setData] = useState([])
	const [answers, setAnswers] = useState([])
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState(0)
	const [showResults, setShowResults] = useState(false)
	let [allOptions, setAllOptions] = useState()

	useEffect(() => {
		const fetchData = async link => {
			try {
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
	}, [render])

	allOptions = [...helpers.generateStateForOptions(answers)]

	const toggleButton = () => {
		setShowResults(!showResults)
		showResults && playAgain()
	}

	const playAgain = () => {
		setScore(0)
		setStart(!start)
		setRender(!render)
	}

	return (
		<div className="frame">
			<main className="app-container">
				<img src={blob1} className="blob blob2" />
				{start ? (
					<Quizz
						questions={questions}
						options={allOptions}
						reference={data}
						setScore={setScore}
					/>
				) : (
					<IntroPage setStart={() => setStart(!start)} />
				)}
				<img src={blob2} className="blob blob1" />
				<div className="results">
					<p>
						{showResults && (
							<span className="score">
								{score <= 5 && "You scored "}
								{score}/{questions.length} {score <= 5 && "correct answers"}
							</span>
						)}
						{!start ? (
							""
						) : (
							<Button
								label={showResults ? "Play 🔮 again" : "Check 🔭 Answer"}
								handleClick={toggleButton}
							/>
						)}
					</p>
				</div>
			</main>
		</div>
	)
}

export default App
