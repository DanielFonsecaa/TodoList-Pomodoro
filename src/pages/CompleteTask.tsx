import React, { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";

const CompleteTask = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [selectTask, setSelectTask] = useState<ITask | null>();

  const deleteTask = (taskToDelete: string): void => {
    const updatedTasks = todoList.filter(
      (task) => task.taskName !== taskToDelete
    );
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    setTodoList(updatedTasks);
  };

  const viewTask = (task: ITask): void => {
    console.log(task);
    setSelectTask(task);
  };
  const closeViewEdit = (): void => {
    setSelectTask(null);
  };

  useEffect(() => {
    const tasks = localStorage.getItem("completedTasks");
    if (tasks !== null) {
      const parsedTasks = JSON.parse(tasks);
      console.log("parsedTasks", parsedTasks);
      setTodoList(parsedTasks);
    }
    console.log(tasks);
  }, []);

  return (
    <div className="m-auto w-full h-full overflow-auto mt-5">
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
              <TodoTask
                task={task}
                completionOrDeleteTask={deleteTask}
                viewTask={() => viewTask(task)}
                isCompleteAction={false}
              />
            </tr>
          ))}
        </tbody>
      </table>
      {selectTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col gap-6">
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
                <h3 className="inline text-xl font-bold ">Description:</h3>
                <h2 className="inline px-3">{selectTask.description}</h2>
              </div>

              <div className="">
                <h3 className=" inline text-xl font-bold">Deadline:</h3>
                <h2 className=" inline px-3">{selectTask.deadline} days</h2>
              </div>
            </div>
            <button
              onClick={closeViewEdit}
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

export default CompleteTask;
