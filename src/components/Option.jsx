import classNames from "classnames"

export default function Option(props) {
	const optionClass = classNames({
		"active-option": props.active,
		"active-option inactive-option": !props.active
	})

	return (
		<button className={optionClass} onMouseDown={props.handleClick}>
			{props.option}
		</button>
	)
}
