let connected = false;

let establishConnection = function () {
    if (connected) return;

    let id = document.getElementById("inputID").value;
    console.log(id);
    
    let ws = new WebSocket("ws://localhost:7000/" + id);
    ws.onopen = () => {
        connected = true;
        console.log("connected");
    }
    ws.onclose = () => {    
        connected = false;
        console.log("disconnected");
    }
    ws.onerror = e => console.log("Something went wrong:", e);
}