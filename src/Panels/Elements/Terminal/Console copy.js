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
    const [string, setString] = useState('> ');

    //Create a context for the string variable
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    var da = '> ';

    function update(info) {
        if(info.endsWith("\n")){
            da+=info; 
            var out2 = output;
            out2.push(da);
            setOutput(out2);
            setString('> ');
            da='> ';
        } else {
            da+=info;
            setString(da);
        }
    
        console.log(string, output)

    }

    useEffect(() => {
        if (!socketRef.current) {
            console.log(isConnected);
            socketRef.current = io('http://cansat.dragos.codes:3041');
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
            //Console log date in day hours time
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var time = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
            console.log(time);
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

    useEffect(() => {
        const interval = setInterval(() => {
            let e = document.getElementById('console');
            let checkbox = document.getElementById('chx').checked;
            if(checkbox)e.scrollTop = e.scrollHeight;
        }, 100);
        return () => clearInterval(interval);
    }, []);

    function handleInput(event) {
        setInput(event.target.value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            var out3 = output;
            out3.push(input);
            setOutput(out3);
            console.log(output);
       
            socketRef.current.emit('command', input);
            setInput('');

        }

    }

    return (<>
    <div className="console" id="console">
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
            <br/><br/>
        </div>
        <div className='check'>
        <input type='checkbox' id="chx" value="Auto-scroll"/>
        <label for="chx" > Auto-scroll</label>
        </div>

    </>
        //Make the console scroll on overflow
        

    );
}

export default Console;
