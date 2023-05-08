import React, { useEffect, useState, useRef, useContext } from 'react';
import './Console.css';
import { io } from 'socket.io-client';
import axios from 'axios';

function Console(params) {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const [output, setOutput] = useState([]);
    const [input, setInput] = useState('');

    const socketRef = useRef(null);

    const [data, setData] = useState('');
    const [string, setString] = useState('');

    //Create a context for the string variable
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    var da = '';

    function update(info) {
        if(info=='^'){
            var out2 = output;
            out2.push(da);
            setOutput(out2);
            //setOutput([...output, da]);
            setString('');
            da='';
        } else {
            da+=info;
            setString(da);
        }
    
        ///setString(da);
        //setOutput([...output, info]);
        //Edit the last element of an array
        //x[x.length - 1] += info;
        //setOutput(x);
        console.log(string, output)
        //Add another item to an array 
        //setOutput([...output, info]);
    }

    function newLine(){
        //var x = output;
        //Edit the last element of an array
        //x[x.length - 1] += '\n';
        //setOutput(x);   
     }

    useEffect(() => {
        if (!socketRef.current) {
            console.log(isConnected);
            socketRef.current = io('http://localhost:3041');
            //setInterval(() => newLine(), 1000)
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
            update(info);
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

    function handleInput(event) {
        setInput(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            setOutput([...output, input]);
            console.log(output);
            axios.get('http://localhost:3005/cli?command=' + input,)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setInput('');

        }

    }

    return (
        <div className="console">
            {output.map((line, index) => (
                <div key={index} className="console-line">{line}</div>
            ))}
            {string? <div key='current' className="console-line">{string}</div> : null}
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
