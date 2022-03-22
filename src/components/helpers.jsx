const setStateForAnswers = data =>
	data.map(object => {
		const newArr = []
		const options = [...object.incorrect_answers]
		options.splice(Math.ceil(Math.random() * options.length), 0, object.correct_answer)
		newArr.push(...options)
		return newArr
	})

const setStateForQuestions = data => [...data.map(object => object.question)]

const generateAnswers = answer => ({
	isClicked: true,
	id: Math.ceil(Math.random() * 1000),
	option: answer
})

const generateStateForOptions = arr => {
	const arrbuffer = []
	const optionState = []
	for (let i = 0; i < arr.length; i++) {
		arrbuffer.push(arr[i].map(ans => generateAnswers(ans)))
	}
	arrbuffer.forEach(arr => optionState.push(arr))
	return optionState
}

export default {
	setStateForAnswers,
	setStateForQuestions,
	generateStateForOptions
}
