const SideBar = () => {
  return (
    <div className="w-full bg-purple-500 relative">
      <ul className="capitalize flex justify-evenly items-center gap-5 mx-3 p-3 font-bold tracking-wider text-white">
        <li
          className={`${
            location.pathname === "/" ? "bg-purple-700 p-3 rounded-2xl" : ""
          }`}
        >
          <a href="/">to do</a>
        </li>
        <li
          className={`${
            location.pathname === "/completed"
              ? "bg-purple-700 p-3 rounded-2xl"
              : ""
          }`}
        >
          <a href="/completed">completed</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
