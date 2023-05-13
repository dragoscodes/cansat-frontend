import Map from './Elements/Map/Map.js'
import { Grid, GridItem } from '@chakra-ui/react'
import Signal from './Elements/Signal/Signal.js'
import { Voltage } from './Elements/Charts/Battery/Voltage.js'
import ModelViewer from './Elements/Map/Or.js'
import { Current } from './Elements/Charts/Battery/Current.js'
import { Altitude } from './Elements/Charts/Altitude/Altitude.js'

export default function VPanel(props) {

    console.log(props);

    return (
        <Grid
            h='85vh'
            templateRows='repeat(10, 1fr)'
            templateColumns='repeat(4, 1fr)'
            gap={4}
        >
            <GridItem rowSpan={8} colSpan={1} >
                <Voltage {...props}/>
                <Current {...props}/>
                </GridItem>
               
            <GridItem rowSpan={7} colSpan={2}  bg='papayawhip' >
                <Map styleSettings={{"height": "100%", "width": "100%"}} {...props}/>
            </GridItem>
            <GridItem colSpan={1} bg='papayawhip'>
         <ModelViewer {...props} />
            </GridItem>
            
            <GridItem colSpan={1} rowSpan={1} bg='papayawhip'>
                <Signal {...props}/>
            </GridItem>
            <GridItem colSpan={1}>
                <Altitude {...props}/>
            </GridItem>
         
            <GridItem colSpan={4}  />
            <GridItem colSpan={4} bg='tomato' />
        </Grid>
    )

}