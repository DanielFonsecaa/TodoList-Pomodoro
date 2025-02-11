import { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";
import ScrollIndicator from "../Components/ScrollIndicator";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(1);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const [taskToComplete, setTaskToComplete] = useState<string>();
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

  const handleConfirmComplete = (taskName: string): void => {
    setTaskToComplete(taskName);
    setPopupMessage("Are you sure you want to complete this task ?");
    setHasPopup(true);
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
      <div className="flex lg:flex-row flex-col gap-3 items-center justify-evenly">
        <div className="capitalize flex gap-9">
          <div className="w-36 group relative">
            <label className="text-black text-[.8em] absolute -top-5 left-1">
              Task Name
            </label>
            <input
              className="w-36 outline-0 bg-gray-200 rounded-full p-2"
              type="text"
              placeholder="Ex: Homework"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div className="w-28 group relative">
            <label className="text-black text-[.8em] absolute -top-5 left-1">
              Deadline (Days)
            </label>
            <input
              className="w-14 outline-0 bg-gray-200 rounded-full p-2"
              type="number"
              placeholder="Days"
              value={deadline}
              onChange={(e) => setDeadline(Number(e.target.value))}
            />
          </div>
        </div>
        <button
          className="text-white bg-purple-500 p-3 rounded-full hover:bg-purple-600 active:bg-purple-400 h-fit hover:scale-105 transition-all duration-300 active:translate-y-5"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      <div className=" overflow-auto mt-6">
        <table className="table-auto w-full divide-y divide-black border-collapse">
          <thead>
            <tr className="">
              <th className="px-4 py-2">Task Name</th>
              <th className="px-4 py-2">Deadline</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task: ITask, key: number) => (
              <tr
                key={key}
                className="odd:bg-white even:bg-purple-700 even:text-white"
              >
                <TodoTask
                  task={task}
                  completionOrDeleteTask={handleConfirmComplete}
                  isCompleteAction={true}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45 ">
          <div className="bg-white p-5 font-medium tracking-wider rounded-lg">
            <p>{popupMessage}</p>
            <div className="flex gap-3 mt-6">
              {taskToComplete && (
                <button
                  onClick={() => {
                    if (taskToComplete) {
                      completeTask(taskToComplete);
                      setHasPopup(false);
                      setTaskToComplete(undefined);
                    }
                  }}
                  className="px-4 py-2 cursor-pointer bg-purple-500 text-white rounded-lg hover:bg-purple-700"
                >
                  Yes, Delete
                </button>
              )}
              <button
                onClick={() => setHasPopup(false)}
                className="px-4 py-2 cursor-pointer bg-gray-500 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ScrollIndicator />
    </div>
  );
};

export default Home;
