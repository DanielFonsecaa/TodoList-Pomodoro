import React, { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";

const CompleteTask = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const deleteTask = (taskToDelete: string): void => {
    const updatedTasks = todoList.filter(
      (task) => task.taskName !== taskToDelete
    );
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    setTodoList(updatedTasks);
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
    <div className="flex flex-col m-auto w-fit h-100 mt-7 overflow-auto ">
      <div className="flex p-5">
        <div className="flex">
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
                  <TodoTask task={task} completionOrDeleteTask={deleteTask} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompleteTask;
