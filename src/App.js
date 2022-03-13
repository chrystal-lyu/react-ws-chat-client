import logo from "./logo.svg";
import "./App.css";
import Chat from "./components/Chat.tsx";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <pre>React WebSocket Chat App</pre>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
};

export default App;
