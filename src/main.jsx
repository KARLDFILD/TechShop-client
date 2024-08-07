import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserStore from "./store/UserStore.js";
import DeviceStore from "./store/DeviceStore.js";

export const Context = createContext(null);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const apiUrl = import.meta.env.VITE_API_URL;

const Main = () => {
  return (
    <Context.Provider
      value={{
        user: new UserStore(),
        device: new DeviceStore(),
      }}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Context.Provider>
  );
};

root.render(<Main />);
