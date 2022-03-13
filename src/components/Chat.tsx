import React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import Login from "./Login";

const URL = "ws://localhost:3030";
const client = new W3CWebSocket(URL);

const Chat = () => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);

  useEffect(() => {
    client.onopen = () => {
      console.log("connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data as string);
      if (dataFromServer.type === "newmessage") {
        setMessages(dataFromServer.data.clientMessages);
      }
    };
  });

  const addMessage = (message: string) => {
    const copy = messages;
    copy.push({ name: name, message: message });
    client.send(
      JSON.stringify({
        type: "newmessage",
        username: name,
        content: copy,
      })
    );
  };

  return (
    <div>
      {name ? (
        <div>
          <pre>current name: {name}</pre>
          <ChatInput onSubmit={(message) => addMessage(message)} />
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              name={message.name}
              message={message.message}
            />
          ))}
        </div>
      ) : (
        <Login onSubmit={(name) => setName(name)} />
      )}
    </div>
  );
};

export default Chat;
