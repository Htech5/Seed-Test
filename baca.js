// WebSocket connection
let websocket = new WebSocket("ws://192.168.100.159:8765");

// Handle incoming messages from WebSocket
websocket.onmessage = function (event) {
  let data = JSON.parse(event.data);
  document.getElementById("temperature").textContent = data.temperature;
  document.getElementById("humidity").textContent = data.humidity;
  document.getElementById("fan1_status").textContent = data.fan1_status
    ? "ON"
    : "OFF";
  document.getElementById("fan2_status").textContent = data.fan2_status
    ? "ON"
    : "OFF";
};

// Function to handle toggle logic
function setupToggle(buttonId, relayName) {
  const button = document.getElementById(buttonId);
  let isOn = false; // Track current status

  button.addEventListener("click", function () {
    isOn = !isOn; // Toggle status

    // Update button text based on the current status
    button.textContent = `${relayName}: ${isOn ? "ON" : "OFF"}`;

    // Send WebSocket message with the status
    let message = {};
    message[relayName] = isOn ? 1 : 0;
    websocket.send(JSON.stringify(message));

    console.log(`${relayName} is now ${isOn ? "ON (1)" : "OFF (0)"}`);
  });
}

// Setup toggle buttons for each relay
setupToggle("relay_a_toggle", "relay_a");
setupToggle("relay_b_toggle", "relay_b");
setupToggle("relay_c_toggle", "relay_c");
setupToggle("relay_d_toggle", "relay_d");