const SideBar = () => {
  return (
    <div className="w-full bg-purple-500 relative">
      <ul className="capitalize flex justify-evenly gap-5 mx-3 p-3 font-bold tracking-wider text-white">
        <li>
          <a href="/">to do</a>
        </li>
        <li>
          <a href="/completed">completed</a>
        </li>
      </ul>
      <div
        className={`absolute top-1/4 left-40 transition-all duration-500  ${
          location.pathname === "/" ? "" : "translate-x-100 rotate-180"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default SideBar;
// className={`${
// location.pathname === "/"
// ? "bg-purple-950 p-4 rounded-2xl text-white"
// : ""
// }`}
