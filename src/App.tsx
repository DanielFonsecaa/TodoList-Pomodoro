import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Timer from "./Components/Timer";
function App() {
  return (
    <>
      <NavBar></NavBar>
      <SideBar></SideBar>
      <div className="h-100">
        <Outlet></Outlet>
      </div>
      <Timer></Timer>
    </>
  );
}

export default App;
