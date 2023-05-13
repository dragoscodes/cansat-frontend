import React from 'react';
import { Progress } from '@chakra-ui/react'

//https://codepen.io/timgomm/pen/NpRRZV - for bar with markers

export default function MissionBar(props) {
    
    if(props.data){
        var time = props.data.system.run_time;

        return(
            <>
                    <Progress colorScheme='green' size='lg' value={66} />
                    <h4>Latest update - runtime: {Math.floor(time/60)}:{Math.floor(time%60)}               Status: {props.data.system.mission_status} FC Status: {props.data.system.fc_status}</h4>
            </>
        )
    } else return (
        <Progress colorScheme='green' size='lg' value={66} />
    )
    
}

