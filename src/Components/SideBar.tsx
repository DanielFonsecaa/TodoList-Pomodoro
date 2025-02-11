import React from "react";

const SideBar = () => {
  return (
    <div className="fixed m-fit h-screen bg-purple-500">
      <ul className="capitalize flex flex-col gap-3 mt-3 mx-3 p-3 font-bold tracking-wider  text-white">
        <li>
          <a href="/">to do</a>
        </li>
        <li>
          <a href="/completed">completed</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
