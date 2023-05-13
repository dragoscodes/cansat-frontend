import { Voltage } from "./Elements/Charts/Battery/Voltage.js";
import MissionButton from "./Elements/MissionControl/MissionButton.js";
import {ModelViewer} from './Elements/Map/Or.js';

export default function YPanel(props) {
    return <>
    <Voltage {...props}/>
    <MissionButton {...props}/>
    </>;
}