let socket; // WebSocket instance

// Function to establish WebSocket connection
export const connectToWebSocket = () => {
    const serverUrl = 'ws://localhost:8082'; // Replace with your WebSocket server URL

    socket = new WebSocket(serverUrl);

    socket.onopen = () => {
        console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
        console.log('Received message:', event.data);
        // Handle received message here (e.g., trigger an action in the component)
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed.');
    };

    return socket;
};

// Function to send data via WebSocket
export const sendDataViaWebSocket = (data) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(data);
    } else {
        console.error('WebSocket connection not established.');
    }
};