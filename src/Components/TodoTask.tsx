import { ITask } from "../Interface";

interface Props {
  task: ITask;
  completionOrDeleteTask(taskNameToDelete: string): void;
  isCompleteAction: boolean;
}

const TodoTask = ({
  task,
  completionOrDeleteTask,
  isCompleteAction,
}: Props) => {
  const isPastOrToday = (deadline: Date): boolean => {
    const today = new Date();
    // Set time to midnight for both today and deadline to ignore the time part
    today.setHours(0, 0, 0, 0);
    const deadlineLocal = new Date(deadline);
    deadlineLocal.setHours(0, 0, 0, 0);

    return deadlineLocal <= today;
  };

  return (
    <>
      <td
        className={`text-center tracking-widest px-2 ${
          isPastOrToday(new Date(task.deadline)) ? "text-red-500" : ""
        }`}
      >
        {task.taskName}
      </td>
      <td
        className={`text-center tracking-widest ${
          isPastOrToday(new Date(task.deadline)) ? "text-red-500" : ""
        }`}
      >
        {new Date(task.deadline).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })}
      </td>
      <td className="px-4 py-2 flex justify-evenly gap-2">
        {isCompleteAction ? (
          <button
            className="px-2 py-1 cursor-pointer "
            onClick={() => completionOrDeleteTask(task.taskName)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7 hover:scale-110"
            >
              <path
                className={
                  isPastOrToday(new Date(task.deadline)) ? "stroke-red-500" : ""
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        ) : (
          <button
            className="px-2 py-1 cursor-pointer"
            onClick={() => completionOrDeleteTask(task.taskName)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 hover:scale-110"
            >
              <path
                className={
                  isPastOrToday(new Date(task.deadline)) ? "stroke-red-500" : ""
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        )}
      </td>
    </>
  );
};

export default TodoTask;
