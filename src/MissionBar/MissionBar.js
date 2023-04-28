import React from 'react';
import { Progress } from '@chakra-ui/react'

//https://codepen.io/timgomm/pen/NpRRZV - for bar with markers

export default function MissionBar({ progress }) {
    return(
        <Progress colorScheme='green' size='lg' value={progress} />
    )
}