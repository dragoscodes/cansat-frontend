import Video from './Elements/Video/Video.js'

export default function XPanel(props) {
    console.log(props);
    return <>
    <Video />
    <h1>{props.data}</h1>
    </>
}