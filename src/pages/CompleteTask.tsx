import { useState, useEffect } from "react";
import { ITask } from "../Interface";
import TodoTask from "../Components/TodoTask";
import { motion } from "framer-motion";
import ScrollIndicator from "../Components/ScrollIndicator";

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
    <div
      className={`m-auto w-full overflow-auto shadow-black/5 ${
        todoList.length === 0 ? "" : "rounded-3xl shadow-xl "
      }`}
    >
      <table className="table-auto w-full divide-y divide-black">
        <thead className={todoList.length === 0 ? "" : "rounded-t-3xl"}>
          <tr className="font-serif">
            <th className="lg:px-14 ">Task Name</th>
            <th className="lg:px-14 ">Duo Date</th>
            <th className="lg:px-14 "></th>
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
                completionOrDeleteTask={handleConfirmDelete}
                isCompleteAction={false}
              />
            </motion.tr>
          ))}
        </tbody>
      </table>

      {hasPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-black/45 ">
          <div className="bg-[#EAEAEA] p-5 text-lg tracking-wide rounded-lg">
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

export default CompleteTask;
