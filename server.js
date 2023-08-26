const server = require('http').createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const port  =3000;
server.listen(port)
console.log(`Listening to port ${port}`);

let readyPlayerCount = 0

io.on('connection', (socket)=>{
    console.log('a user connected', socket.id);

     socket.on("ready", () => {
       console.log("Player ready", socket.id);
       readyPlayerCount++;
       if(readyPlayerCount === 2){
        //broadcast('start game')
        io.emit('start game', socket.id)
       }
     });
})