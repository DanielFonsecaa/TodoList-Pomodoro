import { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";

const CompleteTask = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [taskToDelete, setTaskToDelete] = useState<string>();

  const [hasPopup, setHasPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const deleteTask = (taskToDelete: string): void => {
    const updatedTasks = todoList.filter(
      (task) => task.taskName !== taskToDelete
    );
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
    setTodoList(updatedTasks);
  };

  const handleConfirmDelete = (taskName: string): void => {
    setTaskToDelete(taskName);
    setPopupMessage("Are you sure you want to delete this task ?");
    setHasPopup(true);
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
            <th className="px-4 py-2">Task Name</th>
            <th className="px-4 py-2">Deadline</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((task: ITask, key: number) => (
            <tr key={key} className=" odd:bg-white even:bg-purple-700">
              <TodoTask
                task={task}
                completionOrDeleteTask={handleConfirmDelete}
                isCompleteAction={false}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45 ">
          <div className="bg-white p-5 font-medium tracking-wider rounded-lg">
            <p>{popupMessage}</p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (taskToDelete) {
                    deleteTask(taskToDelete);
                    setTaskToDelete(undefined); // Reset the task
                    setHasPopup(false); // Close the popup after completion
                  }
                }}
                className="px-4 py-2 cursor-pointer bg-purple-500 text-white rounded-lg hover:bg-purple-700"
              >
                Yes, Delete
              </button>

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
    </div>
  );
};

export default CompleteTask;
