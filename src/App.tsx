import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Timer from "./Components/Timer";
function App() {
  return (
    <div className="w-fit md:w-[60em] h-screen relative m-auto bg-[#EAEAEA]">
      <div className="sticky top-0 bg-[#EAEAEA] z-50">
        <NavBar></NavBar>
        <SideBar></SideBar>
      </div>
      <div className="flex sm:flex-row flex-col bg-[#EAEAEA] ">
        <div className="p-10 ">
          <Timer></Timer>
        </div>
        <div className="m-10 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;
