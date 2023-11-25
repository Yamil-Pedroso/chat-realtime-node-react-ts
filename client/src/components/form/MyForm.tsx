import { Section, Form, Input, Button } from "./styles";
import { useState, useEffect } from "react";
import socket from "../../services/ioSocket";

const MyForm = () => {
  const [message, setMessage] = useState("");
   
  useEffect(() => {
    socket.on('connection', () => {
        console.log('Connected to the server');
      });
    
    socket.on('chat-message', (message) => {
      console.log('Received message:', message);
    });
  
    socket.on('connection', (data) => {
        console.log(data);
        setMessage(data)
    });

}
, [message]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("chat-message", message);
    setMessage("");
  };

  return (
    <Section>
      <Form 

      onSubmit={handleSubmit}>
        <Input
          type="text"
          name="message"
          id="input-message"
          placeholder="Write a Message"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </Form >
    </Section>
  );
};

export default MyForm;
