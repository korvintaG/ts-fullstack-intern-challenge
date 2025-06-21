import { Outlet } from "react-router-dom";
import "./App.css";
import { AppHeaderUI } from "./AppHeader/AppHeader";

function App() {
  return (
    <>
      <AppHeaderUI />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default App;
