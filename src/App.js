import MissionBar from './MissionBar/MissionBar';
import TabMenu from './Tabs';
import React, { useEffect, useState , useRef } from 'react';
import { io } from 'socket.io-client';
import config from './config.js'

function App() {

  console.log(config)

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const socketRef = useRef(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ isConnected , setIsConnected] = useState(false);

useEffect(() => {
  if (!socketRef.current) {
    console.log(isConnected);
    socketRef.current = io(`http://cansat.dragos.codes:${config.socket_port}`);
  }
}, []);

//Read the data.json file and add it to the data state

var data_recieved = null;

function update(res) {
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

  async function onData(info) {
    console.log(info);
    //update(info);
  }
  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('response', onData);

  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
    socket.off('response', onData);
    socket.removeAllListeners();
  };

}, []);

  return (
    <>
    <MissionBar progress={66} status={data ? data.system.mission_status : null} />
    <TabMenu data={data}/>
    </>
  );
}

export default App;
