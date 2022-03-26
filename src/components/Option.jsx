import classNames from "classnames"

export default function Option(props) {
	const conditionalStyles = classNames("active-option", {
		"choosen-option": props.isClicked
	})
	return (
		//prettier-ignore
		<button 
		className={conditionalStyles}
		onMouseDown={props.handleClick} 
		id={props.id}
		>
			{props.option}
		</button>
	)
}
