const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({ path: "COM3", baudRate: 9600 });
const parser = new ReadlineParser({ delimiter: '\r\n' })
port.pipe(parser)
port.on("open", () => {
    console.log('serial port open');
});

parser.on('data', data => {
    console.log(data)
    port.write("Era una vez")
})