function Button(props) {
	return (
		<button className="global-btn" onClick={props.handleClick}>
			{props.label}
		</button>
	)
}

export default Button
