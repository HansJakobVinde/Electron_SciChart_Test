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
        } else if ('vcu/116.ImuMeasurements.ax' in dataMessage.data) {
            const timestamp = dataMessage.timestamp;
            const ax = dataMessage.data['vcu/116.ImuMeasurements.ax'];
            const ay = dataMessage.data['vcu/116.ImuMeasurements.ay'];
            const az = dataMessage.data['vcu/116.ImuMeasurements.az'];
            const lsb = dataMessage.data['vcu/116.ImuMeasurements.gps_time_lsb'];
            const msb = dataMessage.data['vcu/116.ImuMeasurements.gps_time_msb'];
            const picth = dataMessage.data['vcu/116.ImuMeasurements.pitch_rate'];
            const roll = dataMessage.data['vcu/116.ImuMeasurements.roll_rate'];
            const yaw = dataMessage.data['vcu/116.ImuMeasurements.yaw_rate'];
            const pps_lsb = dataMessage.data['vcu/116.ImuMeasurements.pps_time_lsb'];

            win.webContents.send('imu-data', { timestamp, ax, ay, az, lsb, msb, picth, roll, yaw, pps_lsb });
        } else if ('sensors/454.SgsEvoScannAirPressure.probe_1' in dataMessage.data) {
            const timestamp = dataMessage.timestamp;
            const probe_1 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_1'];
            const probe_2 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_2'];
            const probe_3 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_3'];
            const probe_4 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_4'];
            const probe_5 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_5'];
            const probe_6 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_6'];
            const probe_7 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_7'];
            const probe_8 = dataMessage.data['sensors/454.SgsEvoScannAirPressure.probe_8'];
            const temp = dataMessage.data['sensors/454.SgsEvoScannAirPressure.temperature'];

            win.webContents.send('air-pressure', { timestamp, probe_1, probe_2, probe_3, probe_4, probe_5, probe_6, probe_7, probe_8, temp });
        }
    });

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})