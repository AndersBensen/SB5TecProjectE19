let connected = false;
let ws;
let name;
var canvas;

let establishConnection = function() {
  if (connected) return;

<<<<<<< HEAD
  let url = document.getElementById("inputUrl").value;
  let id = document.getElementById("inputID").value;
  console.log(id);
=======
    let url = document.getElementById("inputUrl").value
    let port = document.getElementById("inputID").value;
    console.log(port);
    
    //ws = new WebSocket("ws://" + url + ":7000/" + id);
    ws = new WebSocket("ws://" + url + ":" + port);
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
>>>>>>> 8b136b1dd002c1ebc872be7e118762affbac2cfd

  ws = new WebSocket("ws://" + url + ":7000/" + id);
  ws.onopen = () => {
    name = document.getElementById("inputName").value;
    ws.send(JSON.stringify({ name }));
    connected = true;
    console.log("connected");
    createCanvas();
  };
  ws.onclose = () => {
    connected = false;
    console.log("disconnected");
  };
  ws.onerror = e => console.log("Something went wrong:", e);

  ws.onmessage = gameData => {
    playerData = JSON.parse(gameData.data);
    updateCanvas(playerData);

    console.log(playerData);
  };
};

document.onkeydown = event => {
  if (!connected) return;

  switch (event.key) {
    case "ArrowLeft":
      ws.send(JSON.stringify({ name, keydown: "LEFT" }));
      break;
    case "ArrowRight":
      ws.send(JSON.stringify({ name, keydown: "RIGHT" }));
      break;
    default:
      console.log("Not a valid key");
  }
};

document.onkeyup = event => {
  if (!connected) return;

  switch (event.key) {
    case "ArrowLeft":
      ws.send(JSON.stringify({ name, keyup: "LEFT" }));
      break;
    case "ArrowRight":
      ws.send(JSON.stringify({ name, keyup: "RIGHT" }));
      break;
    default:
      console.log("Not a valid key");
  }
};

let createCanvas = () => {
  canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 350;
  canvas.context = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.getElementById("empty"));

  canvas.clear = () => {
    canvas.context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas in order to update current posisitons
  };
  console.log(canvas);
};

let updateCanvas = playerData => {
  canvas.clear();

  playerData.forEach(player => {
    let ctx = canvas.context;
    let points = player.positions;

    console.log(player);
    ctx.fillStyle = player.color;

    points.forEach(point => {
      ctx.fillRect(point.x, point.y, 10, 10);
    });
  });
};
