import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { createClient } from '@libsql/client';

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

const db = createClient({
  url: "libsql://welcome-blue-shield-yamil-pedroso.turso.io",
  authToken: process.env.DB_TOKEN,
});

async function initializeDatabase() {
  try {
    await db.execute(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
      user TEXT
    )`);
    console.log("Database table 'messages' created successfully.");
  } catch (error) {
    console.error("Error creating database table:", error);
  }
}

initializeDatabase();

io.on("connection", (socket) => {
  console.log("a user is connected!");

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });

  socket.on("chat-message", async (message) => {
    let result
    try {
      result = await db.execute({
          sql: 'INSERT INTO messages (content) VALUES (:message)',
          args: { message }  // to prevent SQL injection
        });
    } catch (error) {
      console.error(error);
      return;
    }

    if (result.lastInsertRowid !== undefined) {
      io.emit("chat-message", message, result.lastInsertRowid.toString());
      console.log('message: ' + message);
    } else {
      console.error("Unable to retrieve the ROWID of the last inserted row.");
    }

    console.log('auth');
    console.log(socket.handshake.auth);

    if (!socket.recovered) {
      try {
        const results = await db.execute({
          sql: 'SELECT id, content FROM messages WHERE id > ?',
          args: [socket.handshake.auth.serverOffset ?? 0],
        });

        results.rows.forEach((row: any) => {
          socket.emit("chat-message", row.content, row.id.toString());
        }
        );

        } catch (error) {
          console.error(error);
          return;
        }
    }
  } );
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
}
);
