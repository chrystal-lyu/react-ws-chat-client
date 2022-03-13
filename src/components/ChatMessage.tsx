import React from "react";

export interface ChatMessageProps {
  name: string;
  message: string;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { name, message } = props;
  return (
    <p>
      <strong>{name}</strong> <code>{message}</code>
    </p>
  );
};

export default ChatMessage;
