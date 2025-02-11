import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Timer from "./Components/Timer";
function App() {
  return (
    <div className="w-fit md:w-[760px] h-screen relative m-auto bg-white">
      <div className="sticky top-0 bg-white">
        <NavBar></NavBar>
        <SideBar></SideBar>
      </div>
      <div className="h-[30em]">
        <Outlet></Outlet>
      </div>

      <div className="p-10 bg-white">
        <Timer></Timer>
      </div>
    </div>
  );
}

export default App;
