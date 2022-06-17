const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./database.js')
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const axios = require('axios')

var sensorData, temp, humid, date, tempToSend, humidToSend,
    timeoutCounter, currentDate

const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

port.on("open", () => {
    console.log('serial port open');
});

function post() {
    axios.post(
        "http://localhost:3036/temperature/add",
        tempToSend,
        {
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            //console.log(res);
        }).catch((err) => {
            console.log(err);
        });

    axios.post(
        "http://localhost:3036/humidity/add",
        humidToSend,
        {
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            //console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    timeoutCounter++
}

parser.on('data', data => {
    sensorData = data.split(',')
    temp = sensorData[0]
    humid = sensorData[1]
    date = new Date()
    currentDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    //dateConverted = dateConverted.split(' ')[0]
    tempToSend = JSON.stringify({
        temp: temp,
        date: currentDate
    })

    humidToSend = JSON.stringify({
        humid: humid,
        date: currentDate
    })

    console.log(temp)
    console.log(humid)
    console.log(currentDate)
});

setInterval(post, 60000) // Інтервал між пост запитами, 3 600 000 - одна година

app.use(cors())
app.use(express.json());

app.get('/temperature', (req, res) => {
    db.query('select * from ( select DATE_FORMAT(temperature.date, "%d.%m %H:%i") as date, \
    value from temperature order by id desc limit 5 ) as temperature order by \
    temperature.date  asc;', function (err, result, fields) {
        //console.log(result);
        res.json(result);
    }
    );
})

app.post('/temperature/add', (req, res) => {
    let temp = req.body.temp
    let date = req.body.date
    db.query('INSERT INTO `kurs`.`temperature`(`date`, `value`) VALUES (?, ?);',
        [date, temp], function (err, result, fields) {
            console.log(result);
            res.json(result);
        }
    );
})

app.get('/humidity', (req, res) => {
    db.query('select * from ( select DATE_FORMAT(humidity.date, "%d.%m %H:%i") \
    as date, value from humidity order by id desc limit 5 ) as humidity order by humidity.date  asc;;',
        function (err, result, fields) {
            //console.log(result);
            res.json(result);
        }
    );
})

app.post('/humidity/add', (req, res) => {
    let humid = req.body.humid
    let date = req.body.date
    db.query('INSERT INTO `kurs`.`humidity`(`date`, `value`) VALUES (?, ?);',
        [date, humid], function (err, result, fields) {
            console.log(result);
            res.json(result);
        }
    );
})

app.listen(3036, () => console.log("server has been started on port 3036"))