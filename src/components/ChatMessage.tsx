import React from "react";

export interface ChatMessageProps {
  name: string;
  message: string;
}

const ChatMessage = (props: ChatMessageProps) => {
  const { name, message } = props;
  return (
    <tr>
      <td>{name}</td>
      <td>{message}</td>
    </tr>
  );
};

export default ChatMessage;
