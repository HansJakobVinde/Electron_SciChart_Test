const { contextBridge, ipcRenderer } = require("electron");

// Expose safe ipcRenderer methods to renderer process
contextBridge.exposeInMainWorld("electronAPI", {
    onPitchData: (callback) => ipcRenderer.on("pitch-data", (event, dataMessage) => {
        // console.log("Received data in preload:", dataMessage);
        callback(dataMessage);
    }),
    onGGdata: (callback) => ipcRenderer.on("gg-data", (event, dataMessage) => {
        // console.log("Received data in preload:", dataMessage);
        callback(dataMessage);
    }),
    onMotorTorque: (callback) => ipcRenderer.on("motor-torque", (event, dataMessage) => {
        // console.log("Received data in preload:", dataMessage);
        callback(dataMessage);
    })
});
