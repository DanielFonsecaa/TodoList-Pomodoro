const SideBar = () => {
  return (
    <div className="w-full bg-purple-500">
      <ul className="capitalize flex justify-evenly gap-5 mx-3 p-3 font-bold tracking-wider  text-white">
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
