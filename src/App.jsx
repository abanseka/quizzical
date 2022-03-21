import { useState, useEffect } from "react"
import axios from "axios"
import { nanoid } from "nanoid"
import url from "./config/config"

import blob1 from "./assets/blobs.svg"
import blob2 from "./assets/blobs (1).svg"

import Button from "./components/Button"
import Question from "./components/Question"
import Option from "./components/Option"
import mockdata from "./config/mockdata"

function App() {
	const [showScore, setShowScore] = useState(true)
	const [answers, setAnswers] = useState([])
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		;(async link => {
			try {
				const req = await axios.get(link)
				setAnswers(
					req.data.results.map(object => {
						const newArr = []
						const options = [...object.incorrect_answers]
						options.splice(
							Math.ceil(Math.random() * options.length),
							0,
							object.correct_answer
						)
						newArr.push(...options)
						return newArr
					})
				)
				setQuestions(req.data.results.map(object => [...object.question]))
			} catch (err) {
				throw new Error(err)
			}
		})(url)
	}, [])

	const toggleScore = () => setShowScore(!showScore)
	const setScoreDisplayButton = () =>
		showScore ? (
			<Button label={"Check answers"} handleClick={toggleScore} />
		) : (
			<p>
				<span className="score">You scored 3/5 correct answers</span>
				<Button label={"play again"} handleClick={toggleScore} />
			</p>
		)

	const edit = e => {
		e.currentTarget.style.backgroundColor = "#D6DBF5"
		e.currentTarget.style.border = "none"
	}

	return (
		<div className="frame">
			<main className="app-container">
				<img src={blob1} className="blob blob2" />
				{questions.map((qn, i) => (
					<section className="question-answer" key={nanoid()}>
						<>
							<Question key={nanoid()} question={qn} />
							<ul className="options" key={nanoid()}>
								{answers[i].map(ans => (
									<Option
										key={nanoid()}
										handleClick={e => edit(e)}
										option={ans}
									/>
								))}
							</ul>
						</>
					</section>
				))}
				<img src={blob2} className="blob blob1" />
				<div className="results">{setScoreDisplayButton()}</div>
			</main>
		</div>
	)
}

export default App
