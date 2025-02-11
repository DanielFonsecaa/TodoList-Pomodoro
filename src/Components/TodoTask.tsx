import React from "react";
import { ITask } from "../Interface";

interface Props {
  task: ITask;
  completionOrDeleteTask(taskNameToDelete: string): void;
}

const TodoTask = ({ task, completionOrDeleteTask }: Props) => {
  return (
    <>
      <td className="max-w-10 px-4 py-2">{task.taskName}</td>
      <td className="text-center px-4 py-2">{task.deadline}</td>
      <td className="px-4 py-2 flex justify-center gap-2">
        <button>
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
        <button
          className="px-2 py-1"
          onClick={() => completionOrDeleteTask(task.taskName)}
        >
          X
        </button>
      </td>
    </>
  );
};

export default TodoTask;
