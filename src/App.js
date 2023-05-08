import MissionBar from './MissionBar/MissionBar';
import TabMenu from './Tabs';
import React, { useEffect, useState , useRef } from 'react';
import { io } from 'socket.io-client';

const MyContext = React.createContext();


function App() {

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
    socketRef.current = io('http://localhost:3041');
  }
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
    //console.log(info);
    setData(info);
    await sleep(100);
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
}, [data]);

  return (
    <MyContext.Provider value={'xyz'}>
    <MissionBar progress={66}/>
    <TabMenu data={data}/>
    </MyContext.Provider>
  );
}

export default App;
