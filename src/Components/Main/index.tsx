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
  // Кол-во элементов, которые я загружаю с сервера
  const [count, setCount] = useState(15);

  // Ф-ия, которая увеличивает кол-во загружаемых с сервера элементов
  const scrollMain = useCallback(() => {
    const { current } = mainRef;
    console.log("scroll works");

    if (current) {
      const isMainEnd = current.scrollHeight - current.scrollTop - 50 <= current.clientHeight;
      if (isMainEnd) setCount(count + 1);
    }
  }, []);

  // Вешаем обработчик на элемент, в массив передаю саму функцию, которая не изменится и current,
  // который должен поменяться, когда я получу current
  useEffect(() => {
    const { current } = mainRef;
    if (current) {
      current.addEventListener("scroll", scrollMain);
    }
    return () => {
      alert("removing");
      current?.removeEventListener("scroll", scrollMain);
    };
  }, [scrollMain]);

  // При изменении кол-ва загружаемых элементов с сервера запускается их загрузка
  // И если кол-во загружаемых элементов равно 16, удаляем обработчик
  useEffect(() => {
    if (count === 16) {
      if (mainRef.current) {
        mainRef.current.removeEventListener("scroll", scrollMain);
      }
    }
    requireTasks("f20a07c7-bce6-4d61-921d-12913784ed8b", `${count}`, "1");
  }, [count, scrollMain]);

  if (!tasks) return <StyledPreloader type="spinner" />;

  const tasksList = tasks.map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
  ));

  return <StyledMain ref={mainRef}>{tasksList}</StyledMain>;
};

export default Main;
