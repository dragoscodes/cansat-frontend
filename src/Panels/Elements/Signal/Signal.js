import "./Signal.scss"

export default function Signal(props) {
	if(props.data){
		return (
			<i className={`icon__signal-strength signal-${props.data.system.lte_active ? 4 : 2}`}>
				<span class="bar-1"></span>
				<span class="bar-2"></span>
				<span class="bar-3"></span>
				<span class="bar-4"></span>
			</i>
		)
	} else {
		return (
			<><i className={`icon__signal-strength signal-0`}>
				<span class="bar-1"></span>
				<span class="bar-2"></span>
				<span class="bar-3"></span>
				<span class="bar-4"></span>
			</i>
			<h5>Not connected</h5>
			</>
			
		)
	}
	
}