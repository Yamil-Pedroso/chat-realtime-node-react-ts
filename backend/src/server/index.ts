import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors( { origin: '*' } ));
app.use(morgan('dev'));

// Socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  }
});

io.on("connection", (socket) => {
  console.log("a user is connected!");

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });

  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
    console.log('message: ' + message);
  });
});


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World nice to see Typescript running!');
});

// My routes
app.get('/api/v1/message', (req: Request, res: Response) => {
  res.send('Hello World nice to see Typescript running!');
  //res.sendFile(process.cwd() + '/src/config/data/message.ts');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
