import React from "react";
import { useState } from "react";

export interface ChatInputProps {
  onSubmit: (payload: string) => void;
}

const ChatInput = (props: ChatInputProps) => {
  const { onSubmit } = props;
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        message && onSubmit(message);
        setMessage("");
      }}
    >
      <input
        type="text"
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        placeholder={"Enter message..."}
      />
      <input type="submit" value={"Send"} />
    </form>
  );
};

export default ChatInput;
