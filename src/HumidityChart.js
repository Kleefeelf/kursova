import { Line } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
import axios from 'axios'
import { useEffect, useState } from 'react';

function HumidityChart() {
    const [humidity, setHumidity] = useState([])

    function fetch() {
        axios.get("http://localhost:3036/humidity").then((res) => {
            setHumidity(res.data)
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
        <div className='humid-chart'>
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
                        labels: [humidity[0]?.date, humidity[1]?.date, humidity[2]?.date, humidity[3]?.date, humidity[4]?.date],
                        datasets: [
                            {
                                id: 1,
                                borderColor: 'rgb(44, 130, 201)',
                                backgroundColor: 'rgba(44, 130, 201, 0.5)',
                                label: `Вологість`,
                                data: [humidity[0]?.value, humidity[1]?.value, humidity[2]?.value, humidity[3]?.value, humidity[4]?.value],
                            },
                            {
                                id: 2,
                                borderColor: 'rgb(0, 0, 0)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                label: 'Нижня норма',
                                data: [60, 60, 60, 60, 60]
                            },
                            {
                                id: 3,
                                borderColor: 'rgb(0, 0, 0)',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                label: 'Верхня норма',
                                data: [75, 75, 75, 75, 75]
                            }
                        ],
                    }}
                />
            </div>
            <div className="humid-circle">
                {humidity[humidity.length - 1]?.value} %
            </div>
        </div>
    )
}

export default HumidityChart