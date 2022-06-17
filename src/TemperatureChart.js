import { Line } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
import axios from 'axios'
import { useEffect, useState } from 'react';


function TemperatureChart() {
    const [temperature, setTemperature] = useState([])
    function fetch() {
        axios.get("http://localhost:3036/temperature").then((res) => {
            setTemperature(res.data)
            console.log(res.data);
        })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetch()
        }, 10000)
        return () => clearInterval(interval)
    }, []);



    return (
        <div className='temp-chart'>
            <div className='container'>
                <div className='chart-container'>
                    <Line
                        datasetIdKey='id'
                        options={
                            {
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        labels: {
                                            // This more specific font property overrides the global property
                                            font: {
                                                family: "Montserrat",
                                                size: 14,
                                            },
                                        }
                                    }
                                }
                                
                            }
                        }
                        data={{
                            labels: [temperature[0]?.date, temperature[1]?.date, temperature[2]?.date, temperature[3]?.date, temperature[4]?.date],
                            datasets: [
                                {
                                    id: 1,
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    label: `Температура`,
                                    data: [temperature[0]?.value, temperature[1]?.value, temperature[2]?.value, temperature[3]?.value, temperature[4]?.value],
                                },
                                {
                                    id: 2,
                                    borderColor: 'rgb(0, 0, 0)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    label: 'Нижня норма',
                                    data: [15, 15, 15, 15, 15]
                                },
                                {
                                    id: 3,
                                    borderColor: 'rgb(0, 0, 0)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    label: 'Верхня норма',
                                    data: [28, 28, 28, 28, 28]
                                }
                            ],
                        }}
                    />
                </div>
            </div>
            <div className="temp-circle">
                {temperature[temperature.length - 1]?.value} C°
            </div>
        </div>
    )
}

export default TemperatureChart