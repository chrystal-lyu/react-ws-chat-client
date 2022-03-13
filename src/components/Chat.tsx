import React, { ChangeEvent } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";

const URL = "ws://localhost:3030";
const client = new W3CWebSocket(URL);

const Chat = () => {
  const [name, setName] = useState("Chrystal");
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

  const onEditorStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <label htmlFor="name">
        Name&nbsp;
        <input
          type="text"
          id={"name"}
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => onEditorStateChange(e)}
        />
      </label>
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
  );
};

export default Chat;
