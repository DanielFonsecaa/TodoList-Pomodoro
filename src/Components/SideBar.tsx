const SideBar = () => {
  return (
    <div className="w-full bg-purple-500 relative">
      <ul className="capitalize flex justify-evenly items-center gap-5 mx-3 p-3 text-lg font-bold tracking-widest text-white">
        <li
          className={`${
            location.pathname === "/" ? "bg-purple-800 p-3 rounded-full" : ""
          }`}
        >
          <a href="/">to do</a>
        </li>
        <li
          className={`${
            location.pathname === "/completed"
              ? "bg-purple-800 p-3 rounded-full"
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
