const url = "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"
const getdata = require("./fetchData.js")

describe("making sure data is availbe for use", () => {
	it("should fetch data asynchronoulsy", async () => {
		const res = await getdata(url)
		expect(res.results).not.toBe(undefined)
	})

	it("Question, and answers are available", async () => {
		const res = await getdata(url)
		expect(res.results.length).toBe(5)

		res.results.forEach(object => {
			expect(Object.keys(object)).toContain("question")
		})

		res.results.forEach(object => {
			expect(Object.keys(object)).toContain("correct_answer")
		})

		res.results.forEach(object => {
			expect(Object.keys(object)).toContain("incorrect_answers")
		})
	})

	it("return four array values", async () => {
		const res = await getdata(url)
		res.results.map(object => {
			expect([...object.incorrect_answers, object.correct_answer].length).toBe(4)
		})
	})

	it("returns one question and four answers", async () => {
		const res = await getdata(url)
		res.results.map(object => {
			// console.log(`
			// 	${object.question}
			// 	${[...object.incorrect_answers, object.correct_answer]}
			// 	${object.correct_answer}
			// 	`)
			expect([...object.incorrect_answers, object.correct_answer].length).toBe(4)
		})
	})

	it("Place correct answer at random index", async () => {
		const res = await getdata(url)
		// random x between 1 and 4
		res.results.map(object => {
			const options = [...object.incorrect_answers]
			options.splice(Math.ceil(Math.random() * options.length), 0, object.correct_answer)

			// console.log(`
			// 	${object.question}
			// 	${options}
			// 	${object.correct_answer}
			// 	`)

			expect(options.length).toBe(4)
		})
	})

	it("returns and array of all option array", async () => {
		let alloptions = []
		const res = await getdata(url)

		res.results.map(object => {
			const options = [...object.incorrect_answers]
			options.splice(Math.ceil(Math.random() * options.length), 0, object.correct_answer)

			alloptions.push(options)
		})

		console.log(alloptions)
		expect(alloptions.length).toBe(5)
	})
})
