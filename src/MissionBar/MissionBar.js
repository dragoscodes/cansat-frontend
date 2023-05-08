import React from 'react';
import { Progress } from '@chakra-ui/react'

//https://codepen.io/timgomm/pen/NpRRZV - for bar with markers

export default function MissionBar({ progress , status, FCstatus }) {
    const time = 1102.5;
    //Get the integer from time/60
    //Get the remainder from time%60
    //Display the time in the format of minutes:seconds



    return(
        <>
                <Progress colorScheme='green' size='lg' value={progress} />
                <h4>Latest update - runtime: {Math.floor(time/60)}:{Math.floor(time%60)}               Status: {status} FC Status: </h4>
        </>
    )
}

