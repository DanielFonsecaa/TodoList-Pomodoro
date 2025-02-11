import { ITask } from "../Interface";

interface Props {
  task: ITask;
  completionOrDeleteTask(taskNameToDelete: string): void;
  viewTask(task: ITask): void;
  isCompleteAction: boolean;
}

const TodoTask = ({
  task,
  completionOrDeleteTask,
  viewTask,
  isCompleteAction,
}: Props) => {
  return (
    <>
      <td className="text-center px-4 py-2">{task.taskName}</td>
      <td className="text-center px-4 py-2">{task.deadline}</td>
      <td className="px-4 py-2 flex justify-evenly gap-2">
        <button className="cursor-pointer" onClick={() => viewTask(task)}>
          <svg
            fill="#000000"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.343 18.657a1 1 0 0 1-.707-1.707l4.95-4.95-4.95-4.95a1 1 0 0 1 1.414-1.414l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-.707.293z" />
          </svg>
        </button>

        {isCompleteAction ? (
          <button
            className="px-2 py-1 cursor-pointer"
            onClick={() => completionOrDeleteTask(task.taskName)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
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
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
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
