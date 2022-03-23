import Button from "./Button"

const introPage = ({ setStart }) => {
	return (
		<div className="intro-page">
			<div className="intro-content">
				<h2 className="intro-heading">🎡 Quizzical 🎯</h2>
				<p className="intro-description"> 🧪 Put your Noggin 🧠 to the test 🔬</p>
				<Button
					label={"Start 🧮 quiz"}
					handleClick={setStart}
					width={"40%"}
					fontSize={"1.3rem"}
					padding={"2rem"}
				/>
			</div>
		</div>
	)
}

export default introPage
