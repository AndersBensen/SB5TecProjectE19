let connected = false;
let ws;
let name;
let canvas;

let establishConnection = function () {
    if (connected) return;

    let id = document.getElementById("inputID").value;
    console.log(id);
    
    ws = new WebSocket("ws://localhost:7000/" + id);
    ws.onopen = () => {
        name = document.getElementById("inputName").value;
        ws.send(JSON.stringify({name}));
        connected = true;
        console.log("connected");
    }
    ws.onclose = () => {    
        connected = false;
        console.log("disconnected");
    }
    ws.onerror = e => console.log("Something went wrong:", e);

    ws.onmessage = (gameData) => {
        playerData = JSON.parse(gameData.data);
        updateCanvas(playerData)
    }

    createCanvas();
}

document.onkeydown = (event) => {
    if (!connected) return;

    switch (event.key) {
        case "ArrowLeft":
            ws.send(JSON.stringify({name, keydown: "left"}));
            break;
        case "ArrowRight":
            ws.send(JSON.stringify({name, keydown: "right"}));
            break;
        default:
            console.log("Not a valid key");
            
    }
    
}

let createCanvas = () => {
    canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 350;
    canvas.context = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.getElementById("empty"));

    canvas.clear = () => {
        canvas.context.clearRect(0,0,canvas.width, canvas.height);
    }
    console.log(canvas);
    
}

let updateCanvas = (playerData) => {
    canvas.clear();
    playerData.forEach(player => {
        let ctx = canvas.context;
        ctx.fillStyle = "Red";
        ctx.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    });
}