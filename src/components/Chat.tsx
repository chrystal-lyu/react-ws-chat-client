import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import ChatInput from "./ChatInput";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import Login from "./Login";

const URL = "ws://localhost:3030";
const client = new W3CWebSocket(URL);

const Chat = () => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);

  const addMessage = (message: ChatMessageProps) => {
    setMessages((prev) => [message, ...prev]);
  };

  const submitMessage = (message: string) => {
    const content = { name: name, message: message };
    client.send(
      JSON.stringify({
        type: "newmessage",
        content,
      })
    );
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data as string);
      if (dataFromServer.type === "newmessage") {
        addMessage(dataFromServer.data.clientMessage);
      }
    };
  });

  return (
    <div>
      {name ? (
        <div>
          <div className="text-secondary mb-2">Logged in as: {name}</div>
          <ChatInput onSubmit={(message) => submitMessage(message)} />
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
