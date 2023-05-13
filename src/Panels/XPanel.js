import ModelViewer from './Elements/Map/Or.js';
import Video from './Elements/Video/Video.js'
import { Voltage } from './Elements/Charts/Battery/Voltage.js';
import { Current } from './Elements/Charts/Battery/Current.js';
import { Signal } from './Elements/Charts/Signal/Signal.js';
import {Temperatures} from './Elements/Charts/Temperatures/Temperatures.js';

export default function XPanel(props) {

    const roll = Math.PI / 4; // Example roll angle in radians
  const pitch = Math.PI / 6; // Example pitch angle in radians
  const yaw = Math.PI / 3;

    return <>
        <Video {...props}/>
    </>
}