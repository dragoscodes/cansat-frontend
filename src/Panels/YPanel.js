import { Voltage } from "./Elements/Charts/Battery/Voltage.js";
import MissionButton from "./Elements/MissionControl/MissionButton.js";

export default function YPanel() {
    return <>
    <Voltage />
    <MissionButton />
    </>;
}