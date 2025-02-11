import { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(1);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const [hasPopup, setHasPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const addTask = (): void => {
    if (!task) {
      setPopupMessage("Task name is required!");
      setHasPopup(true);
      return;
    }
    if (todoList.some((t) => t.taskName === task)) {
      setPopupMessage("Task with the same name already exists!");
      setHasPopup(true);
      return;
    }

    const newTask = {
      taskName: task,
      deadline: deadline,
    };

    const newList = [...todoList, newTask];
    localStorage.setItem("todoList", JSON.stringify(newList));

    setTodoList(newList);
    setTask("");
    setDeadline(1);
  };

  const completeTask = (taskToComplete: string): void => {
    const completedTask = todoList.find(
      (task) => task.taskName === taskToComplete
    );

    if (completedTask) {
      const newList = todoList.filter(
        (task) => task.taskName !== taskToComplete
      );
      setTodoList(newList);

      let updatedCompletedTasks = [];
      const alreadyCompletedTasks = localStorage.getItem("completedTasks");

      if (alreadyCompletedTasks) {
        updatedCompletedTasks = JSON.parse(alreadyCompletedTasks);

        const isTaskInStorage = updatedCompletedTasks.some(
          (task: ITask) => task.taskName === taskToComplete
        );

        if (!isTaskInStorage) {
          updatedCompletedTasks.push(completedTask);
        }
      } else {
        updatedCompletedTasks = [completedTask];
      }

      localStorage.setItem(
        "completedTasks",
        JSON.stringify(updatedCompletedTasks)
      );

      localStorage.setItem("todoList", JSON.stringify(newList));
    }
  };

  useEffect(() => {
    const tasks = localStorage.getItem("todoList");
    console.log(tasks);
    if (tasks !== null) {
      const parsedTasks = JSON.parse(tasks);
      setTodoList(parsedTasks);
    }
  }, []);
  return (
    <div className="m-auto w-full p-4">
      <div className="flex lg:flex-row flex-col gap-3 items-center justify-evenly">
        <div className="capitalize flex gap-9">
          <div className="w-36 group relative">
            <label className="text-black text-sm absolute -top-5 left-1">
              Task Name
            </label>
            <input
              className="w-36 outline-0 border-b-2 border-transparent bg-purple-200 rounded-2xl p-2 focus:border-purple-500 transition-all duration-300 border-b-purple-500 "
              type="text"
              placeholder="Do Homework"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="absolute left-0 bottom-0 h-[2px] bg-purple-500 w-0 transition-all duration-500 group-hover:w-full"></div>
          </div>

          <div className="w-28 group relative">
            <label className="text-black text-sm absolute -top-5 left-1">
              Deadline (Days)
            </label>
            <input
              className="w-14 outline-0 border-b-2 border-transparent bg-purple-200 rounded-2xl p-2 focus:border-purple-500 transition-all duration-300 border-b-purple-500"
              type="number"
              placeholder="Days"
              value={deadline}
              onChange={(e) => setDeadline(Number(e.target.value))}
            />
            <div className="absolute left-0 bottom-0 h-[2px] bg-purple-500 w-0 transition-all duration-500 group-hover:w-10"></div>
          </div>
        </div>
        <button
          className="text-white bg-purple-500 p-3 rounded-2xl hover:bg-purple-600 active:bg-purple-400 h-fit hover:scale-105 transition-all duration-300 active:translate-y-5"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className=" overflow-auto mt-6">
        <table className="table-auto w-full divide-y divide-black border-collapse">
          <thead>
            <tr className="">
              <th className="border-r px-4 py-2">Task Name</th>
              <th className="border-r px-4 py-2">Deadline</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task: ITask, key: number) => (
              <tr key={key} className="odd:bg-white even:bg-purple-100">
                <TodoTask
                  task={task}
                  completionOrDeleteTask={completeTask}
                  isCompleteAction={true}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45 ">
          <div className="bg-white p-5 rounded-lg shadow-lg shadow-purple-500">
            <p>{popupMessage}</p>
            <button
              onClick={() => setHasPopup(false)}
              className="cursor-pointer mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 active:translate-y-5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
