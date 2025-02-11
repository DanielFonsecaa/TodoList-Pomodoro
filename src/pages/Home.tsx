import React, { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";

const Home = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);

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
      description: description,
      completed: isCompleted,
    };
    const newList = [...todoList, newTask];
    localStorage.setItem("todoList", JSON.stringify(newList));

    setTodoList(newList);
    setTask("");
    setDealine(0);
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

      setCompletedTasks((completed) => {
        const updatedCompletedTasks = [...completed, completedTask];
        const alreadyCompletedTasks = localStorage.getItem("completedTasks");

        if (alreadyCompletedTasks) {
          const parsedCompletedTasks = JSON.parse(alreadyCompletedTasks);
          const newCompleted = [...parsedCompletedTasks, completedTask];
          localStorage.setItem("completedTasks", JSON.stringify(newCompleted));
          return newCompleted;
        }

        localStorage.setItem(
          "completedTasks",
          JSON.stringify(updatedCompletedTasks)
        );
        return updatedCompletedTasks;
      });

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
    <div className="flex flex-col m-auto w-fit h-100 mt-7 overflow-auto ">
      <div className="flex p-5 ">
        <div className="flex ">
          <div>
            <h1 className="capitalize">Task name</h1>
            <input
              type="text"
              placeholder="Task name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div>
            <h1 className="capitalize">task deadline in days</h1>

            <input
              type="number"
              placeholder="Deadline (in Days)"
              value={deadline}
              onChange={(e) => setDealine(Number(e.target.value))}
            />
          </div>
          <div>
            <h1 className="capitalize">Task description</h1>

            <input
              type="string"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button
          className="text-white bg-purple-500 p-5 rounded-2xl hover:bg-purple-700 active:bg-purple-400"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div className="todoList">
        <div className="todoList">
          <table className="table-auto w-full">
            <thead>
              <tr className="">
                <th className=" px-4 py-2">Task Name</th>
                <th className=" px-4 py-2">Deadline</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((task: ITask, key: number) => (
                <tr key={key} className="odd:bg-white even:bg-gray-100">
                  <TodoTask task={task} completionOrDeleteTask={completeTask} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <button
              onClick={() => setHasPopup(false)}
              className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700"
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
