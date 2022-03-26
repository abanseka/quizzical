import { nanoid } from "nanoid"

const setStateForAnswers = data =>
	data.map(object => {
		const newArr = []
		const options = [...object.incorrect_answers]
		const randomIndex = Math.ceil(Math.random() * options.length)
		options.splice(randomIndex, 0, object.correct_answer)
		newArr.push(...options)
		return newArr
	})

const setStateForQuestions = data => [
	...data.map(object => {
		const parse = new DOMParser()
		return parse.parseFromString(object.question, "text/html").body.textContent
	})
]

const generateOptions = answer => ({
	isClicked: true,
	isActive: true,
	isCorrect: false,
	isWrong: false,
	isUnActive: false,
	option: answer,
	id: nanoid()
})

const generateStateForOptions = arr => {
	const arrbuffer = []
	const optionState = []
	for (let i = 0; i < arr.length; i++) {
		arrbuffer.push(arr[i].map(ans => generateOptions(ans)))
	}
	arrbuffer.forEach(arr => optionState.push(arr))
	return optionState
}

export default {
	setStateForAnswers,
	setStateForQuestions,
	generateStateForOptions
}
