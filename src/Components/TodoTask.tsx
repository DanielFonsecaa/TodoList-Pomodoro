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
  return (
    <>
      <td
        className={`text-center tracking-widest px-4 py-2 ${
          task.deadline === 0 ? "text-red-500" : ""
        }`}
      >
        {task.taskName}
      </td>
      <td
        className={`text-center tracking-widest px-4 py-2 ${
          task.deadline === 0 ? "text-red-500" : ""
        }`}
      >
        {task.deadline === 0
          ? "Today"
          : `${task.deadline} ${task.deadline === 1 ? "Day" : "Days"}`}
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
                  task.deadline === 0 ? "stroke-red-500" : "stroke-current"
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
              stroke-width="1.5"
              stroke="currentColor"
              className="size-7 hover:scale-110"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
