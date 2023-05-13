import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Temperatures',
            position: 'bottom',
        },
    },
};


export function Temperatures(props) {

    const [pressure, setPressure] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);
    const [humidity, setHumidity] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);
    const [cpu, setCpu] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);
    const [modem, setModem] = useState([17, 16, 15, 14, 13, 12, 11, 10, 9, 8]);

    const [labels, setLabels] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    useEffect(() => {
        if (props.data) {
            setPressure([...pressure, props.data.sensors.motherboard.temperatures.pres_sensor])
            setHumidity([...humidity, props.data.sensors.motherboard.temperatures.humid_sensor])
            setCpu([...cpu, props.data.sensors.motherboard.temperatures.cpu])
            setModem([...modem, props.data.sensors.motherboard.temperatures.modem])
            setLabels([...labels, labels.length + 1])
        }
        //Return the line chart, including the definition of the chart's axis
    }, [props.data])

    var data = {
        labels,
        datasets: [
            {
                label: 'Pressure Sensor Temperature',
                data: pressure,
                borderColor: '#c9460a',
                backgroundColor: '#c9460a',
            },
            {
                label: 'Humidity Sensor Temperature',
                data: humidity,
                borderColor: '#b5b219',
            },
            {
                label: 'CPU Temperature',
                data: cpu,
                borderColor: '#194ab5',
            },
            {
                label: 'Modem Temperature',
                data: modem,
                borderColor: '#19b5b5'
            }
        ],
    };


    return <Line className="temperatures" style={{ height: "250px", width: "400px" }} options={options} data={data} />;

}
