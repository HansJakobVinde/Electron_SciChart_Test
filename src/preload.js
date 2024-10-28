const { contextBridge, ipcRenderer } = require("electron");

// Expose safe ipcRenderer methods to renderer process
contextBridge.exposeInMainWorld("electronAPI", {
    onPitchData: (callback) => ipcRenderer.on("pitch-data", (event, dataMessage) => {
        // console.log("Received pitch data in preload:");
        callback(dataMessage);
    }),
    onGGdata: (callback) => ipcRenderer.on("gg-data", (event, dataMessage) => {
        // console.log("Received GG data in preload:");
        callback(dataMessage);
    }),
    onMotorTorque: (callback) => ipcRenderer.on("motor-torque", (event, dataMessage) => {
        // console.log("Received torque data in preload:");
        callback(dataMessage);
    }),
    onIMUdata: (callback) => ipcRenderer.on("imu-data", (event, dataMessage) => {
        // console.log("Received IMU data in preload:");
        callback(dataMessage);
    }),
    onAirPressure: (callback) => ipcRenderer.on("air-pressure", (event, dataMessage) => {
        // console.log("Received air pressure data in preload:");
        callback(dataMessage);
    }),
});
