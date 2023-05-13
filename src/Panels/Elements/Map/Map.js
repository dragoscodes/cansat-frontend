import React, { useState , useEffect} from 'react';
import { Viewer, Entity, PointGraphics, EntityDescription, Cesium3DTileset, Clock, CameraLookAt, CameraFlyTo, Model, ModelGraphics, PolylineGraphics} from "resium";
import { Cesium, Quaternion, Ion, Cartesian3, createWorldTerrain, IonResource, JulianDate, ClockRange, ClockStep, createOsmBuildings, CesiumIon, TimeInterval, PolylineArrowMaterialProperty, Color, createWorldTerrainAsync,  TimeIntervalCollection, HeadingPitchRoll } from "cesium";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyODBiMTMyOS02ZWVlLTQxMjUtYjZjOC02MzJjNmExZDA1ODkiLCJpZCI6MTMwNTI3LCJpYXQiOjE2Nzk3NjQ5MjZ9.bFakh-tM-OQsbniWDVOt6Zfepw3Dm2azxkDYPh8bbxI";

const terrainProvider = createWorldTerrain();

const flightData1 = JSON.parse(
    '[{"longitude": 22.252,"latitude":45.4202777,"height":260}]'
);

function Map(props) {

    const [flightData, setData] = useState(flightData1);
    const [latestPosition, setLatestPosition]=useState({"longitude": 24.01519, "latitude": 46.83041, "height": 1800})
    const [firstLoaded, setFirstLoaded] = useState(false);

    useEffect(() => {
        if (props.data ) {
            if(firstLoaded){
                setData([...flightData, latestPosition]); 
                setLatestPosition({"longitude": props.data.navigation.est_long, "latitude": props.data.navigation.est_lat, "height": props.data.navigation.altitude})
                console.log(latestPosition);
            }
            else {
                setLatestPosition({"longitude": props.data.navigation.est_long, "latitude": props.data.navigation.est_lat, "height": props.data.navigation.altitude})
            }

        } 
      }, [props.data])

    console.log(props)

    let viewer; // This will be raw Cesium's Viewer object.

    const handleReady = tileset => {
        if (viewer) {
            viewer.zoomTo(tileset);
        }
    };

    

    return (
        <Viewer style={props.styleSettings} terrainProvider={terrainProvider}>

            <Clock
                startTime={JulianDate.fromIso8601("2023-05-09T12:00:00Z")} // sa schimbi asta cu primul pachet primit daca exista
                currentTime={JulianDate.fromIso8601("2023-05-09T12:00:00Z")} // sa schimbi asta cu timp curent
                stopTime={JulianDate.fromIso8601("2023-05-12T18:00:00Z")} // nu stiu cum sa fac asta
                clockRange={ClockRange.LOOP_STOP} // loop when we hit the end time
                clockStep={ClockStep.SYSTEM_CLOCK_MULTIPLIER}
                multiplier={1}
                shouldAnimate
            />
            {
                //de adaugat data - availivility
                /* availability={
                            new TimeInterval({
                              start: JulianDate.fromIso8601("2023-04-02T12:00:00Z"),
                              stop: JulianDate.fromIso8601("2023-04-02T13:00:00Z"),
                            })
                          }
                          */
                flightData.map((v, i) => {
                    
                    if (i >= 1) return (
                        <><Entity position={Cartesian3.fromDegrees(v.longitude, v.latitude, v.height)} name={i} >
                            <PointGraphics pixelSize={10} />
                            <EntityDescription>
                                <h1>{i}</h1>
                                <p>Telemetry goes here</p>
                            </EntityDescription>
                        </Entity>
                            <Entity>
                                <PolylineArrowMaterialProperty color={Color.RED} />
                                <PolylineGraphics show={true} positions={[Cartesian3.fromDegrees(v.longitude, v.latitude, v.height), Cartesian3.fromDegrees(flightData[i - 1].longitude, flightData[i - 1].latitude, flightData[i - 1].height)]} />
                            </Entity>
                        </>

                    )

                })
            }


            {
                //Camera Controls
                // <CameraFlyTo once destination={Cartesian3.fromDegrees(-74.0707383, 40.7117244, 200)} duration={2} />
            }
            <CameraLookAt target={Cartesian3.fromDegrees(latestPosition.longitude, latestPosition.latitude, latestPosition.height)} offset={new Cartesian3(90, 90, 90)} />

            <Entity position={Cartesian3.fromDegrees(latestPosition.longitude, latestPosition.latitude, latestPosition.height)} name="Latest position">
            <ModelGraphics
                    uri={'/model.glb'}
                    minimumPixelSize={64}
                    maximumScale={4}
                    orientation={new HeadingPitchRoll(0, 0, -Math.PI)}
                />
                <PointGraphics pixelSize={10} />
                <EntityDescription resizeInfoBox={true}>
                    <h4>Coordinates: {latestPosition.longitude + ' , ' + latestPosition.latitude + ' , ' + latestPosition.height}</h4>
                    <h4>Timestamp: </h4>
                    <h6>Packet #</h6>
                </EntityDescription>
            </Entity>

            <Entity>
                <PolylineArrowMaterialProperty color={Color.RED} />
                <PolylineGraphics show={true} positions={[Cartesian3.fromDegrees(10.02219, 56.83041, 190), Cartesian3.fromDegrees(latestPosition.longitude, latestPosition.latitude, latestPosition.height), Cartesian3.fromDegrees(10.01219, 56.83061, 160)]} />
            </Entity>

        </Viewer>
    );
}

export default Map;