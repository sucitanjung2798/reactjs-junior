import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { moviesApi } from "./feature/Api.js";
import { store } from "./feature/store.js";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import "./styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ApiProvider api={moviesApi}>
      <App />
    </ApiProvider>
  </Provider>
);
