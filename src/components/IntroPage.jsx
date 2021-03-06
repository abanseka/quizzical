import Button from "./Button"

const introPage = ({ setStart }) => {
	return (
		<div className="intro-page">
			<div className="intro-content">
				<h2 className="intro-heading">๐ก Quizzical ๐ฏ</h2>
				<p className="intro-description"> ๐งช Put your Noggin ๐ง  to the test ๐ฌ</p>
				<Button
					label={"Start ๐งฎ quiz"}
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
