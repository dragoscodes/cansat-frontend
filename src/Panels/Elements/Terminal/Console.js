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

    /*function update(info) {
        if (info.endsWith("\n")) {
            da += info;
            var out2 = output;
            out2.push(da);
            setOutput(out2);
            setString('');
            da = '';
        } else {
            //Concat da with info
            setString(da + info);
            da = da + info;
        }

        console.log(string, output)
    }*/

    useEffect(() => {
        console.log(params.response);
        if(params.response) {
            if (params.response.endsWith("\n")) {
                da = da + params.response;
                setOutput([...output, '> ' + da]);
                da = '';
                setString('');
            } else {
                da = da + params.response;
                setString(da);
            }
        }
        
    }, [params])


    useEffect(() => {
        const interval = setInterval(() => {
            let e = document.getElementById('console');
            let checkbox = document.getElementById('chx').checked;
            if (checkbox) e.scrollTop = e.scrollHeight;
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
            //Send a get request to the server
            axios.get('http://localhost:4000/cli', {
                params: {
                    command: input
                }
            }).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            });


            setInput('');

        }

    }

    return (<>
        <div className="console" id="console">
            {output.map((line, index) => (
                <div key={index} className="console-line">{line}</div>
            ))}
            {string ? <div key='current' className="console-line">{'> ' + string}</div> : null}
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
            <br /><br />
        </div>
        <div className='check'>
            <input type='checkbox' id="chx" value="Auto-scroll" />
            <label for="chx" > Auto-scroll</label>
        </div>

    </>
        //Make the console scroll on overflow


    );
}

export default Console;
