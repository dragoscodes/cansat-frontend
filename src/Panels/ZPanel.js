import { Altitude } from './Elements/Charts/Altitude/Altitude.js';
import Map from './Elements/Map/Map.js';

export default function ZPanel({...props}) {
    return <>
    <Map {...props}/>
    <Altitude {...props} />
    </>;
}