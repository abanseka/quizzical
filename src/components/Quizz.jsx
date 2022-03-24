import Question from "./Question"
import Option from "./Option"
import { nanoid } from "nanoid"

const Quizz = ({ questions, options, optionIsActive, reference, setScore }) => {
	const parse = new DOMParser()

	const choosen = e => e.target.classList.toggle("choosen-option")

	const checkanswer = (e, ans, answersList) => {
		choosen(e)
		for (let answer of answersList) {
			ans.isClicked && ans.option === answer.correct_answer && console.log("correct")
		}
	}

	return questions.map((qn, qnID) => (
		<section className="question-answer" key={nanoid()}>
			<>
				<Question key={nanoid()} question={qn} />
				<ul className="options" key={nanoid()}>
					{options[qnID].map((ans, ansID) => (
						<Option
							key={nanoid()}
							ID={ansID}
							active={optionIsActive}
							handleClick={e => checkanswer(e, ans, reference)}
							option={parse.parseFromString(ans.option, "text/html").body.textContent}
						/>
					))}
				</ul>
			</>
		</section>
	))
}

export default Quizz
