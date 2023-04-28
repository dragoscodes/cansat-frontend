import React, { useEffect, useState, useRef, useContext} from 'react';
import './Console.css';
import { io } from 'socket.io-client';

function Console(params) {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
    const [output, setOutput] = useState([]);
    const [input, setInput] = useState('');

    const socketRef = useRef(null);

    const [data, setData] = useState(''); 
    const [string, setString] = useState("#");

    //Create a context for the string variable
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!socketRef.current) {
            console.log(isConnected);
            socketRef.current = io('http://localhost:3041');
            //setInterval(() => {if(data)setOutput([...output, data]); setData(null)}, 10000)
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

        function onData(info) {
            console.log(info);
            setString(string+info)
            console.log(string);
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
    }, [output]);

    function handleInput(event) {
        setInput(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            setOutput([...output, input]);
            setInput('');
        }
    }

    return (
        <div className="console">
            {output.map((line, index) => (
                <div key={index} className="console-line">{line}</div>
            ))}
            <div className="console-input">
                <span className="console-prompt">$</span>
                <input
                    type="text"
                    className='input'
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
}

export default Console;
