import Question from "./Question"
import Option from "./Option"
import { nanoid } from "nanoid"

const Quizz = ({ questions, options, reference, setScore }) => {
	const parse = new DOMParser()

	const checkAnswer = (event, ans, reference, setScore) => {
		const option = event.target
		option.style.backgroundColor = ans.isClicked ? "#D6DBF5" : "none"
		option.style.border = ans.isClicked && "none"

		reference.forEach(ref => {
			ans.option === ref.correct_answer &&
				setScore(
					score => (score < 5 && score + 1) || (score === 5 && `Geez!... 😄 ${score}`)
				)
		})
	}

	return questions.map((qn, qnID) => (
		<section className="question-answer" key={nanoid()}>
			<>
				<Question key={nanoid()} question={qn} />
				<ul className="options" key={nanoid()}>
					{options[qnID].map((ans, ansID) => (
						<Option
							key={nanoid()}
							option={parse.parseFromString(ans.option, "text/html").body.textContent}
							ID={ansID}
							handleClick={e => checkAnswer(e, ans, reference, setScore)}
						/>
					))}
				</ul>
			</>
		</section>
	))
}

export default Quizz
