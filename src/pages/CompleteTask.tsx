import { useState, useEffect } from "react";
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
    <div className="m-auto w-full h-full overflow-auto">
      <table className="table-auto w-full divide-y divide-black">
        <thead>
          <tr className="">
            <th className="border-r px-4 py-2">Task Name</th>
            <th className="border-r px-4 py-2">Deadline</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((task: ITask, key: number) => (
            <tr key={key} className=" odd:bg-white even:bg-purple-100">
              <TodoTask
                task={task}
                completionOrDeleteTask={deleteTask}
                isCompleteAction={false}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompleteTask;
