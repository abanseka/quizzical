import { useState, useEffect } from "react"
import axios from "axios"
import url from "./config/config"

import blob1 from "./assets/blobs.svg"
import blob2 from "./assets/blobs (1).svg"

import helpers from "./components/helpers"
import IntroductionPage from "./components/IntroPage"
import Quizz from "./components/Quizz"
import Button from "./components/Button"

function App() {
	const [startQuizz, setStartQuizz] = useState(false)
	const [renderQuizz, setRenderQuizz] = useState(true)
	const [QuizzData, setQuizzData] = useState([])
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
				setQuizzData(data)
			} catch (err) {
				throw new Error(err)
			}
		}
		fetchData(url)
	}, [renderQuizz])

	// * Make this A State
	allOptions = [...helpers.generateStateForOptions(answers)]

	const switchButtons = () => {
		setShowResults(!showResults)
		showResults && resetQuizz()
		// TODO : Make all options gray when check answer is clicked
		if (!showResults) {
			const options = document.getElementsByClassName("option")
			console.log(options)
		}
	}

	const resetQuizz = () => {
		setScore(0)
		setStartQuizz(!startQuizz)
		setRenderQuizz(!renderQuizz)
	}

	const monitorScore = (() => score <= questions.length)()
	return (
		<div className="frame">
			<main className="app-container">
				<img src={blob1} className="blob blob2" />
				{startQuizz ? (
					<Quizz
						questions={questions}
						options={allOptions}
						reference={QuizzData}
						setScore={setScore}
					/>
				) : (
					<IntroductionPage setStart={() => setStartQuizz(!startQuizz)} />
				)}
				<img src={blob2} className="blob blob1" />
				<div className="results">
					<p>
						{showResults && (
							<span className="score">
								{monitorScore && "You scored "}
								{score}/{questions.length} {monitorScore && "correct answers"}
							</span>
						)}
						{startQuizz && (
							<Button
								label={showResults ? "Play 🔮 again" : "Check 🔭 Answer"}
								handleClick={switchButtons}
							/>
						)}
					</p>
				</div>
			</main>
		</div>
	)
}

export default App
