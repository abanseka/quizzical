import classNames from "classnames"

export default function Option(props) {
	const conditionalStyles = classNames("active-option", {
		"choosen-option": !props.isClicked,
		"correct-option": props.isCorrect,
		"wrong-option": props.isWrong,
		"inactive-option": props.isInactive
	})
	return (
		//prettier-ignore
		<button 
		className={conditionalStyles}
		onClick={props.handleClick} 
		id={props.id}
		>
			{props.option}
		</button>
	)
}
