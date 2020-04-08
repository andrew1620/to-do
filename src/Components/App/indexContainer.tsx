import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import App from ".";
import { RootState } from "../../redux/store";
import { getTasks, getTasksTotalCount } from "../../redux/toDoSelectors";
import { Task, requireTasks, deleteList } from "../../redux/toDoReducer";
import StyledPreloader from "../StyledComponents/StyledPreloader";

export type Props = {
  tasks: Array<Task> | null;
  tasksTotalCount: number | null;
  requireTasks: (listId: string) => void;
  deleteList: (listId: string) => void;
};

const AppContainer: React.FC<Props> = (props) => {
  // if (!авторизован) return <StyledPreloader />;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "todo/REQUIRE_LISTS" });
  }, []);

  return <App {...props} />;
};

const mstp = (state: RootState) => {
  return {
    tasks: getTasks(state),
    tasksTotalCount: getTasksTotalCount(state),
  };
};
const mdtp = {
  requireTasks,
  deleteList,
};

export default connect(mstp, mdtp)(AppContainer);
