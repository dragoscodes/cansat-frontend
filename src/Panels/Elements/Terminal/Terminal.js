import React, {useState} from 'react';
import Terminal, { ColorMode, TerminalOutput, TerminalInput } from 'react-terminal-ui';
import './Terminal.css';
import io from "socket.io-client";

const socket = io.connect('http://localhost:3041');

const TerminalController = (props = {}) => {
  const [terminalLineData, setTerminalLineData] = useState([
  ]);
  socket.on('connect', function(error){
    if(error) console.log(error);
    else console.log('connected');
    
  });

function onTerminalInput(terminalInput) {
    setTerminalLineData(terminalLineData.concat([
      <TerminalInput>{terminalInput}</TerminalInput>
    ]));
    //Using socket.io-client, connect to localhost:3028 and send the terminal input    
    socket.emit('command', terminalInput);
  }

  socket.on('response', function(data){
    console.log(data);
    setTimeout(() => {
      setTerminalLineData(terminalLineData.concat([
        <TerminalOutput>{data}</TerminalOutput>
      ]))
    },100)
  });

  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className="container">
      <Terminal name='Drone CLI' colorMode={ ColorMode.Dark }  onInput={ terminalInput => onTerminalInput(terminalInput) }>
        { terminalLineData }
      </Terminal>
    </div>
  )
};

export default TerminalController;