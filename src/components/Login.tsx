import React from "react";
import { useState } from "react";

export interface LoginProps {
  onSubmit: (payload: string) => void;
}

const Login = (props: LoginProps) => {
  const [name, setName] = useState("");
  const { onSubmit } = props;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(name);
          setName("");
        }}
      >
        <input
          type="text"
          id={"name"}
          placeholder="Enter your name..."
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <input type="submit" value={"join to chat"} />
      </form>
      <img
        alt="welcome"
        width={500}
        src="https://i.pinimg.com/originals/4b/39/a9/4b39a94252cddcc7d20326c140278c4e.png"
      />
    </div>
  );
};

export default Login;
