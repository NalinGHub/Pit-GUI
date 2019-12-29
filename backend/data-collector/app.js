//import dataLink from './dataLink'
var network = require('./network')
var SerialPort = require('serialport')
var port = new SerialPort('/dev/ttyS16', { baudRate: 115200 })
var num = 0

port.on('data', (dataBuff) =>
{
    for (var index = 0; index < dataBuff.length; index++)
        network.read(dataBuff[index])
})

//port.on('data', network.read);
port.on('error', function(data)
{
    console.log('Error: ' + data)
});
