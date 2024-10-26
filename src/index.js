const { app, BrowserWindow } = require('electron')
const path = require('path')

require('./WebSocketHandler.js');

const dataEmitter = require('./WebSocketHandler.js');

console.log('Starting electron app');

const createWindow = () => {
    console.log('Creating window');
    const win = new BrowserWindow({
        width: 1400,
        height: 1000,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

  win.loadFile(path.join(__dirname, '../build/index.html'))
  win.webContents.openDevTools();

  dataEmitter.on('newDataMessage', (dataMessage) => {
        // console.log("Received new DataMessage:", dataMessage);

        // Access the DataMessage content
        if ('vcu/114.InsEstimates1.pitch' in dataMessage.data) {
            const pitch = dataMessage.data['vcu/114.InsEstimates1.pitch'];
            const timestamp = dataMessage.timestamp;

            //Send the datamessage to the renderer process
            win.webContents.send('pitch-data', { timestamp, pitch });

        } else if ('vcu/102.INS.ax' in dataMessage.data && 'vcu/102.INS.ay' in dataMessage.data) {

            const ax = dataMessage.data['vcu/102.INS.ax'];
            const ay = dataMessage.data['vcu/102.INS.ay'];
            const timestamp = dataMessage.timestamp;

            //Send the datamessage to the renderer process
            win.webContents.send('gg-data', { timestamp, ax, ay });

        } else if ('vcu/119.InverterEstimates.motor_torque.fl' in dataMessage.data && 'vcu/119.InverterEstimates.motor_torque.fr' in dataMessage.data && 'vcu/119.InverterEstimates.motor_torque.rl' in dataMessage.data && 'vcu/119.InverterEstimates.motor_torque.rr' in dataMessage.data) {
            const timestamp = dataMessage.timestamp;
            const fl = dataMessage.data['vcu/119.InverterEstimates.motor_torque.fl'];
            const fr = dataMessage.data['vcu/119.InverterEstimates.motor_torque.fr'];
            const rl = dataMessage.data['vcu/119.InverterEstimates.motor_torque.rl'];
            const rr = dataMessage.data['vcu/119.InverterEstimates.motor_torque.rr'];

            //Send the datamessage to the renderer process
            win.webContents.send('motor-torque', { timestamp, fl, fr, rl, rr });
        }
    });

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})