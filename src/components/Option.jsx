export default function Option(props) {
	return (
		<button onClick={props.handleClick} id={props.value} className="option">
			{props.option}
		</button>
	)
}
