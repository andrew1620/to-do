import React, { useEffect, useRef, useCallback } from "react";
import throttle from "lodash.throttle";

import Task from "./Task/Task";
import StyledMain from "../StyledComponents/StyledMain";
import { Task as TaskType } from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";
import { NewTaskStatus } from "../../API";

type Props = {
  tasks: Array<TaskType> | null;
  tasksTotalCount: number | null;
  tasksAmountToRequire: number;
  requireTasks: (listId: string, count: string, page: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
  updateTask: (listId: string, taskId: string, newTaskStatus: NewTaskStatus) => void;
  setTasksAmountToRequire: () => void;
};

const Main: React.FC<Props> = ({
  tasks,
  requireTasks,
  deleteTask,
  updateTask,
  tasksTotalCount,
  tasksAmountToRequire: count, // initial tasks amount to download from the server
  setTasksAmountToRequire: setCount,
}) => {
  const mainRef = useRef<HTMLDivElement>(null);

  const downloadIndent = 60; // Min scrollBottom height when you need to download data.

  const scrollMain = useCallback(
    throttle((e: any) => {
      if (e.target) {
        const isMainEnd =
          e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight <= downloadIndent;
        if (isMainEnd) setCount();
      }
    }, 100),
    []
  );

  useEffect(() => {
    const { current } = mainRef;
    current?.addEventListener("scroll", scrollMain);
    return () => {
      current?.removeEventListener("scroll", scrollMain);
    };
  }, [scrollMain]);

  useEffect(() => {
    if (count === tasksTotalCount) {
      if (mainRef.current) {
        mainRef.current.removeEventListener("scroll", scrollMain);
      }
    }
    requireTasks("f20a07c7-bce6-4d61-921d-12913784ed8b", `${count}`, "1");
  }, [count, scrollMain]);

  const tasksList = tasks?.map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
  ));

  return (
    <StyledMain ref={mainRef}>
      {!tasks && <StyledPreloader type="spinner" />}
      {tasks && tasksList}
    </StyledMain>
  );
};

export default Main;
