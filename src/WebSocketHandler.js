const EventEmitter = require('events');
class DataEmitter extends EventEmitter {}
const WebSocket = require('ws')

const dataEmitter = new DataEmitter();

const ws = new WebSocket('ws://localhost:8080/ws/datastream')


class DataMessage {
    constructor(timestamp, data) {
        this.timestamp = timestamp;
        this.data = data;
    }
}

ws.on('message', (data) => {
    try {
        // Parse the incoming data
        const parsedData = JSON.parse(data);

        // Extract timestamp and data object
        const timestamp = parsedData.timestamp;
        const dataObject = parsedData.data;

        // Create a new DataMessage object
        const dataMessage = new DataMessage(timestamp, dataObject);

        // Emit an event when a new DataMessage object is created
        dataEmitter.emit('newDataMessage', dataMessage);

        // Log or use the DataMessage object
        // console.log(dataMessage);

    } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
    }
});

ws.on('open', () => {
    console.log('WebSocket connection opened');
});

ws.on('close', () => {
    console.log('WebSocket connection closed');
});


// Export the DataMessage class and latest data
module.exports = dataEmitter;