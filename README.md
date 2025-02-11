# To-Do List Application

A simple to-do list application built with React, TypeScript, and Vite. The app features a timer, a sidebar for organizing tasks, and a flexible task management system.

## Features

- **Sidebar Navigation**:
  - "To Do" section: Displays tasks that still need to be done.
  - "Completed" section: Displays tasks that have been marked as completed.
- **Task Management**:

  - Add new tasks with a name, deadline (in days), and an optional description.
  - View task details, mark tasks as complete, or delete tasks.

- **Timer**:
  - Use the timer to track work sessions.
  - Play, pause, and reset the timer.
  - A notification and sound alert when the timer runs out, indicating whether it’s time for a break or work.

## Live Demo

The app is deployed and can be accessed at:

[https://listpomodoro.netlify.app/](https://listpomodoro.netlify.app/)

## Installation

To run this project locally:

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the application in your browser at http://localhost:3000.

## Usage

### Sidebar

- The sidebar contains two options:
  - **"To Do"**: Displays tasks that are not yet completed.
  - **"Completed"**: Displays tasks that have been marked as completed.

### Adding a Task

1. Enter a name for the task.
2. Optionally, change the task's deadline (in days).
3. Optionally, provide a description of the task.
4. Click **"Add"** to add the task to the list.

### Task Details

- If a task has a description, two buttons will appear:
  - **View Details**: View the full description of the task.
  - **Complete Task**: Mark the task as completed.

### Completed Tasks

- In the **Completed** section, each task has two buttons:
  - **View Details**: View the task description.
  - **Delete Task**: Remove the task from the completed list.

### Timer

- You can **play**, **pause**, and **reset** the timer, but the timer's value cannot be changed manually.
- Once the timer reaches zero, a pop-up will appear and a sound will play to indicate whether it’s time for a break or work.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for better developer tooling.
- **Vite**: Build tool that provides fast development server and optimized production build.
- **CircularProgressBar**: Used to create a visually appealing timer.

## Observations

While working on this project, I didn’t have much prior experience with TypeScript. To overcome this, I took the initiative to learn more by watching tutorials on YouTube, which greatly helped me improve my understanding and implementation of TypeScript throughout the project.
