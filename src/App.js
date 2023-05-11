import MissionBar from './MissionBar/MissionBar';
import TabMenu from './Tabs';
import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import config from './config.js'

function App() {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const socketRef = useRef(null);

  const [data, setData] = useState(null);
  const [video, setVideo] = useState(null);
  const [response, setResponse] = useState(null);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!socketRef.current) {
      console.log(isConnected);
      socketRef.current = io(`http://${config.host}:${config.socket_port}`);
    }
  }, []);

  //Read the data.json file and add it to the data state

  var data_recieved = null;
  var video_recieved = null;
  var response_recieved = null;

  function updateResponse(res) {
    response_recieved = res;
    setResponse(response_recieved);
    console.log(response_recieved);
  }

  function updateVideo(res) {
    video_recieved = res;
    setVideo(video_recieved);
    console.log(video_recieved);
  }

  function updateData(res) {
    data_recieved = res;
    setData(data_recieved);
    console.log(data_recieved);
  }

  useEffect(() => {
    setData({
      "system": {
        "current": 13.4,
        "voltage": 16.5,
        "current_accum": 0.1,
        "run_time": 1360.2,
        "mission_status": "\"Going to target location\"",
        "fc_status": "\"Go to target mode\"",
        "lte_active": true,
        "signal_strength": 95.3,
        "bmp390_errors": 84,
        "shtc3_errors": 10,
        "iis2mdc_errors": 5,
        "modem_errors": 2,
        "cam_frame_count": 530
      },
      "sensors": {
        "motherboard": {
          "air_pressure": 974.35,
          "relative_humid": 45,
          "temperatures": {
            "pres_sensor": 17.6,
            "humid_sensor": 18.2,
            "cpu": 33,
            "modem": 40
          }
        },
        "flight_controller": {
          "cpu_temp": 16.5,
          "imu": {
            "accel": "[0.43, -0.15, 1.18]",
            "gyro": "[15, -2, 50]",
            "mag": "[60, 5, -600]"
          }
        }
      },
      "config": {
        "emergency_voltage_thres": 14.6,
        "target_location": {
          "lat": 40.3858372,
          "long": 24.2948573,
          "altitude": 200
        }
      },
      "navigation": {
        "last_gps_fix": 1359.8,
        "gps_lat": 40.3851039,
        "gps_long": 24.2949045,
        "altitude": 230.45,
        "est_lat": 40.3851045,
        "est_long": 24.2949048,
        "roll": -30.038,
        "pitch": 4.353,
        "yaw": 278.432
      }
    }
    )

  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onResponse(info) {
      console.log('recieved');
      console.log(info);
      updateResponse(info);
    }

    function onVideo(info) {
      console.log(info);
      updateVideo(info);
    }

    function onData(info) {
      console.log(info);
      updateData(info);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('video', onVideo);
    socket.on('data', onData);
    socket.on('response', onResponse);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('video', onVideo);
      socket.off('data', onData);
      socket.off('response', onResponse);
      socket.removeAllListeners();
    };

  }, []);

  return (
    <>
      <MissionBar progress={66} status={data ? data.system.mission_status : null} />
      <TabMenu data={data} response={response} video={video} />
    </>
  );
}

export default App;
