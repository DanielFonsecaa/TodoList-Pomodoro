import { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";
import ScrollIndicator from "../Components/ScrollIndicator";
import { motion } from "framer-motion";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | null>();
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
    if (!deadline) {
      setPopupMessage("Please select a Deadline!");
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
      deadline: deadline || new Date(),
    };

    const newList = [...todoList, newTask];
    localStorage.setItem("todoList", JSON.stringify(newList));

    setTodoList(newList);
    setTask("");
    setDeadline(null);
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
    if (tasks !== null) {
      const parsedTasks = JSON.parse(tasks);
      setTodoList(parsedTasks);
    }
  }, []);

  return (
    <div className="m-auto w-full">
      <div className="flex lg:flex-row flex-col lg:gap-10 gap-3">
        <div className="capitalize flex lg:flex-row flex-col lg:items-center gap-3">
          <div>
            <input
              className="outline-0 bg-[#F5F5F5] rounded-full text-center p-2 lg:w-40 w-full"
              type="text"
              placeholder="Task Name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div>
            <input
              className={`outline-0 bg-[#F5F5F5] rounded-full gap-2 p-2 w-full flex flex-row justify-center ${
                deadline ? "text-black" : "text-[#7a7a7a]"
              }`}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={deadline ? deadline.toISOString().split("T")[0] : ""}
              placeholder="Select a date"
              onChange={(e) => setDeadline(new Date(e.target.value))}
            />
          </div>
        </div>
        <button
          className="text-white font-bold tracking-wider flex items-center justify-center gap-2 w-full px-2 py-2 rounded-full bg-purple-500 transition-all duration-300 hover:bg-purple-600 hover:scale-105 active:translate-y-5"
          onClick={addTask}
        >
          <span>Add Task</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      <div
        className={`m-auto mt-6 w-full overflow-auto shadow-black/5 ${
          todoList.length === 0 ? "" : "rounded-3xl shadow-xl "
        }`}
      >
        <table className="table-auto w-full divide-y divide-black border-collapse">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Due Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((task: ITask, key: number) => (
              <motion.tr
                key={key}
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="odd:bg-[#EAEAEA] even:bg-purple-700 even:text-white"
              >
                <TodoTask
                  task={task}
                  completionOrDeleteTask={handleConfirmComplete}
                  isCompleteAction={true}
                />
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45 ">
          <div className="bg-[#EAEAEA] text-lg p-5 tracking-wider rounded-lg">
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
                  Yes, Complete
                </button>
              )}
              <button
                onClick={() => {
                  setHasPopup(false);
                  setTaskToComplete(undefined);
                }}
                className="px-4 py-2 cursor-pointer bg-gray-400 text-white rounded-lg hover:bg-gray-500"
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
