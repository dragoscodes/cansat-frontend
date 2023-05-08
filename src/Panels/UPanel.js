import Battery from './Elements/Battery/Battery.js'
import Signal from './Elements/Signal/Signal.js'
import Console from './Elements/Terminal/Console.js'

export default function UPanel(params) {
    return (<>
    <Console {...params}/>
    </>)
}