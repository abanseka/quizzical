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
	const [questions, setQuestions] = useState([])
	const [score, setScore] = useState(0)
	const [showResults, setShowResults] = useState(false)
	const [allOptions, setAllOptions] = useState([])

	useEffect(() => {
		const fetchData = async link => {
			try {
				const req = await axios.get(link)
				const data = req.data.results
				setQuestions(helpers.setStateForQuestions(data))
				setQuizzData(data)

				const answers = helpers.setStateForAnswers(data)
				setAllOptions([...helpers.generateStateForOptions(answers)])
			} catch (err) {
				throw new Error(err)
			}
		}
		fetchData(url)
	}, [renderQuizz])

	const togglePages = answers => {
		setShowResults(!showResults)
		showResults && resetQuizz()

		const answer = answers.map(ans => ans.correct_answer)

		setAllOptions(prevOption =>
			prevOption.map(options => {
				const clickedOptions = options
					.filter(optn => !optn.isClicked)
					.map(ans => ans.option)

				return options.map(ans => {
					if (clickedOptions.includes(ans.option) && !answer.includes(ans.option)) {
						return { ...ans, isWrong: !ans.isWrong }
					} else {
						ans
					}
					return answer.includes(ans.option)
						? { ...ans, isCorrect: !ans.isCorrect }
						: { ...ans, isInactive: !ans.isInactive }
				})
			})
		)
	}

	const resetQuizz = () => {
		setScore(0)
		setStartQuizz(!startQuizz)
		setRenderQuizz(!renderQuizz)
	}

	const monitorScore = (() => score <= questions.length)()

	// prettier-ignore
	return (
		<div className="frame">
			<main className="app-container">
				<img src={blob1} className="blob blob2" />
				{
					startQuizz 
					? 
						<Quizz
								questions={questions}
								options={allOptions}
								reference={QuizzData}
								setScore={setScore}
								setAllOptions={setAllOptions}
							/>
					:	<IntroductionPage setStart={() => setStartQuizz(!startQuizz)} />
				}
				<img src={blob2} className="blob blob1" />
				<div className="results">
					<p>{
							showResults && (
									<span className="score">
										{monitorScore ? `You scored 	${score}/${questions.length} correct answers` : "Oh common, really?"}
									
									</span>
								)}
						{
						startQuizz && (
							<Button
								label={showResults ? "Play 🔮 again" : "Check 🔭 Answer"}
								handleClick={()=>togglePages(QuizzData)}
							/>
						)}
					</p>
				</div>
			</main>
		</div>
	)
}

export default App
