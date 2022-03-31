import Question from "./Question"
import Option from "./Option"
import { nanoid } from "nanoid"

// prettier-ignore
const Quizz = ({ 
	questions, 
	options, 
	reference, 
	setScore, 
	setAllOptions
}) => {
	const parse = new DOMParser()

	const checkanswer = (id, optn, answers) => {
		const correct_answers = answers.map(ans => ans.correct_answer)

		correct_answers.includes(optn.option) 
			&& setScore(score => score + 1)

		setAllOptions(prevOption =>
			prevOption.map(options =>
				options.map(ans => {
					return ans.id === id ? { ...ans, isClicked: !ans.isClicked } : ans
				})
			)
		)
	}

	const printOptions = id =>
		options[id].map(ans => (
			<Option
				key={nanoid()}
				id={ans.id}
				isClicked={ans.isClicked}
				isCorrect={ans.isCorrect}
				isWrong={ans.isWrong}
				isInactive={ans.isInactive}
				handleClick={() => checkanswer(ans.id, ans, reference)}
				option={parse.parseFromString(ans.option, "text/html").body.textContent}
			/>
		))

	return questions.map((qn, qnID) => (
		<section className="question-answer" key={nanoid()}>
			<>
				<Question key={nanoid()} question={qn} />
				<ul className="options" key={nanoid()}>
					{printOptions(qnID)}
				</ul>
			</>
		</section>
	))
}

export default Quizz

// Todo : create 5 classnames and render conditionally
// correct ?
// clicked ?
// wrong?
// active?
// inactive?
// * use classnames npm package
