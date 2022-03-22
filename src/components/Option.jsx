import { nanoid } from "nanoid"
import { useState } from "react"

export default function Option(props) {
	// let [answers, setAnswer] = useState([])

	// function generateAnswers(id, answer) {
	// 	return {
	// 		isClicked: true,
	// 		id: id,
	// 		option: answer
	// 	}
	// }

	// // generate an array of object-like options
	// answers = (arr => {
	// 	const arrbuffer = []
	// 	const allOptions = []
	// 	for (let i = 0; i < arr.length; i++) {
	// 		arrbuffer.push(arr[i].map(ans => generateAnswers(i, ans)))
	// 	}
	// 	arrbuffer.forEach(arr => allOptions.push(...arr))
	// 	return allOptions
	// })(props.answers)

	// console.log(answers)
	return (
		<button className="option" onClick={props.handleClick}>
			{props.option}
		</button>
	)
}
