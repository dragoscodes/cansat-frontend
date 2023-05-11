import Map from './Elements/Map/Map.js'
import { Grid, GridItem } from '@chakra-ui/react'
import Signal from './Elements/Signal/Signal.js'
import { Voltage } from './Elements/Charts/Battery/Voltage.js'

export default function VPanel() {
    return (
        <Grid
            h='85vh'
            templateRows='repeat(10, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap={4}
        >
            <GridItem rowSpan={3} colSpan={1} bg='#2C333D' >
                <Voltage />
                </GridItem>
            <GridItem rowSpan={7} colSpan={2}  bg='papayawhip' >
                <Map styleSettings={{"height": "100%", "width": "100%"}}/>
            </GridItem>
            <GridItem colSpan={1} bg='papayawhip'>
                <Signal />
            </GridItem>
            <GridItem colSpan={1} bg='papayawhip'>
                <Signal />
            </GridItem>
            <GridItem colSpan={4}  />
            <GridItem colSpan={4} bg='tomato' />
        </Grid>
    )

}