import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")!).render(

  

    <React.StrictMode>
      <NextUIProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </NextUIProvider>
    </React.StrictMode>

  

);
