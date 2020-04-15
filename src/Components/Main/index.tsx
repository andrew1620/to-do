import React, { useEffect, useState, useRef, useCallback } from "react";

import Task from "./Task/Task";
import StyledMain from "../StyledComponents/StyledMain";
import { Task as TaskType } from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";
import { NewTaskStatus } from "../../API";

type Props = {
  tasks: Array<TaskType> | null;
  requireTasks: (listId: string, count: string, page: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
};

const Main: React.FC<Props> = ({ tasks, requireTasks, deleteTask, updateTask }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { current } = mainRef;

  // Кол-во элементов, которые я загружаю с сервера
  const [count, setCount] = useState(15);

  // Ф-ия, которая увеличивает кол-во загружаемых с сервера элементов
  const scrollMain = useCallback(() => {
    const { current } = mainRef;

    if (current) {
      const isMainEnd = current.scrollHeight - current.scrollTop - 50 <= current.clientHeight;
      console.log("scroll works", isMainEnd);
      if (isMainEnd) setCount(count + 1);
    }
  }, []);
  // Вешаем обработчик на элемент
  useEffect(() => {
    console.log("current changed");

    if (current) {
      current.addEventListener("scroll", scrollMain);
    }
    return () => {
      console.log("deleliting event during unmounting");
      current?.removeEventListener("scroll", scrollMain);
    };
  }, [scrollMain, current]);

  // При изменении кол-ва загружаемых элементов с сервера запускается их загрузка
  // И если кол-во загружаемых элементов больше 16, удаляем обработчик
  useEffect(() => {
    console.log("require works ", count);
    const { current } = mainRef;
    if (count === 16) {
      if (current) {
        console.log("deleting after scroll");
        current.removeEventListener("scroll", scrollMain);
      }
    }
    requireTasks("f20a07c7-bce6-4d61-921d-12913784ed8b", `${count}`, "1");
  }, [count, requireTasks, scrollMain]);

  if (!tasks) return <StyledPreloader type="spinner" />;

  const tasksList = tasks.map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
  ));

  return (
    <StyledMain id="main" ref={mainRef}>
      {tasksList}
    </StyledMain>
  );
};

export default Main;
