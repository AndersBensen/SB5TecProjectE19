let connected = false;
let ws;
let left = false;
let right = false;

let establishConnection = function () {
    if (connected) return;

    let id = document.getElementById("inputID").value;
    console.log(id);
    
    ws = new WebSocket("ws://localhost:7000/" + id);
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

document.onkeydown = (event) => {
    if (!connected) return;

    switch (event.key) {
        case "ArrowLeft":
            // ws.send(JSON.stringify({keydown: "left"}));
            ws.send('keydown: left');
            break;
        case "ArrowRight":
            // ws.send(JSON.stringify({keydown: "right"}));
            ws.send('keydown: right');
            break;
        default:
            console.log("Not a valid key");
            
    }
    
}