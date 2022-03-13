import React from "react";

export interface ChatMessageProps {
  name: string;
  message: string;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { name, message } = props;
  return (
    <div className="chat-message">
      <div>{name}:</div>
      <div>{message}</div>
    </div>
  );
};

export default ChatMessage;
