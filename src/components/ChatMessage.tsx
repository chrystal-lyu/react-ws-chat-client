import React from "react";

export interface ChatMessageProps {
  name: string;
  message: string;
  time: Date;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { name, time, message } = props;
  console.log(props);
  return (
    <div className="chat-message">
      <div>{name}:</div>
      <div>
        <div>{message}</div>
        <div className="chat-message-time">
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
