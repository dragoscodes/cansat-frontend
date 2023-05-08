import { Voltage } from "./Elements/Charts/Battery/Voltage.js";
import MissionButton from "./Elements/MissionControl/MissionButton.js";

export default function YPanel() {
    return <>
    <Voltage style={{height: "250px", width: "400px"}}/>
    <MissionButton />
    </>;
}