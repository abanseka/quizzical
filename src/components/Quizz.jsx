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

	const checkanswer = (ans, reference) => {

		for (let ref of reference){
			ans.option === ref.correct_answer &&  setScore(score => score + 1)
		}
	}

	const printOptions = (id) =>
		options[id].map(ans => (
			<Option
				key={nanoid()}
				id ={ans.id}
				isactive={ans.isActive}
				isclicked={ans.isclicked}
				handleClick={()=> checkanswer(ans, reference,)}
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
