import "./Signal.scss"

export default function Signal({ strength }) {
	return (
		<i className={`icon__signal-strength signal-${strength}`}>
			<span class="bar-1"></span>
			<span class="bar-2"></span>
			<span class="bar-3"></span>
			<span class="bar-4"></span>
		</i>
	)
}