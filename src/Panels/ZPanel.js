import { Altitude } from './Elements/Charts/Altitude/Altitude.js';
import Map from './Elements/Map/Map.js';
import TerminalController from './Elements/Terminal/Terminal.js';

export default function ZPanel() {
    return <>
    <Map/>
    <Altitude />
    </>;
}