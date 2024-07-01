import "./App.scss";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="app-wrapper">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
