function Button(props) {
	const styles = {
		width: props.width,
		fontSize: props.fontSize,
		padding: props.padding
	}
	return (
		<button className="global-btn" onClick={props.handleClick} style={styles}>
			{props.label}
		</button>
	)
}

export default Button
