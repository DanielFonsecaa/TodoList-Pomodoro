import { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const [hasPopup, setHasPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [selectTask, setSelectTask] = useState<ITask | null>();

  const viewTask = (task: ITask): void => {
    console.log(task);
    setSelectTask(task);
  };
  const closeViewTask = (): void => {
    setSelectTask(null);
  };

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
      description: description,
    };

    const newList = [...todoList, newTask];
    localStorage.setItem("todoList", JSON.stringify(newList));

    setTodoList(newList);
    setTask("");
    setDeadline(0);
    setDescription("");
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
    <div className="m-auto w-full">
      <div className="flex p-6 items-center justify-evenly">
        <div className="capitalize flex flex-col md:flex-row gap-10">
          <div className="w-25 group relative">
            <input
              className="w-25 outline-0 border-b-2 border-transparent focus:border-purple-500 transition-all duration-300"
              type="text"
              placeholder="Name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <div className="absolute left-0 bottom-0 h-[2px] bg-purple-500 w-0 transition-all duration-500 group-hover:w-full"></div>
          </div>

          <div className=" group relative">
            <input
              className="w-10 outline-0 border-b-2 border-transparent focus:border-purple-500 transition-all duration-300"
              type="number"
              placeholder="Days"
              value={deadline}
              onChange={(e) => setDeadline(Number(e.target.value))}
            />
            <div className="absolute left-0 bottom-0 h-[2px] bg-purple-500 w-0 transition-all duration-500 group-hover:w-10"></div>
          </div>
          <div className=" group relative">
            <input
              className="w-25 outline-0 border-b-2 border-transparent focus:border-purple-500 transition-all duration-300"
              type="string"
              placeholder="Long Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="absolute left-0 bottom-0 h-[2px] bg-purple-500 w-0 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>
        <button
          className="text-white bg-purple-500 p-3 rounded-2xl hover:bg-purple-700 active:bg-purple-400 h-fit "
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className="h-64 sm:h-100 overflow-auto">
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
                  viewTask={
                    task.description?.trim() ? () => viewTask(task) : () => {}
                  }
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
              className="cursor-pointer mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {selectTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/45 ">
          <div className="bg-white p-5 rounded-lg shadow-lg shadow-purple-500 flex flex-col gap-6">
            <h1 className="font-bold text-3xl">Task Details</h1>
            <div className="flex flex-col">
              <div className="">
                <h2 className="inline text-xl font-bold">Task Name:</h2>

                <h3 className="px-3 inline">{selectTask.taskName}</h3>
              </div>

              <div
                className={` ${
                  !selectTask.description?.trim() ? "hidden " : ""
                }`}
              >
                <h2 className="inline text-xl font-bold ">Description:</h2>
                <h3 className="inline px-3">{selectTask.description}</h3>
              </div>

              <div className="">
                <h2 className=" inline text-xl font-bold">Deadline:</h2>
                <h3 className="inline px-3">{selectTask.deadline} days</h3>
              </div>
            </div>

            <button
              onClick={closeViewTask}
              className="cursor-pointer mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
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
