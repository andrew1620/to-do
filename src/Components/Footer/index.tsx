import React from "react";
import { useDispatch } from "react-redux";

import StyledFooter from "../StyledComponents/StyledFooter";
import { createTask } from "../../redux/toDoReducer";
import NewTaskForm from "./NewTaskForm";

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const handleFormSubmit = (formData: FormData) => {
    dispatch(createTask("f20a07c7-bce6-4d61-921d-12913784ed8b", formData.taskTitle));
  };

  return (
    <StyledFooter>
      <NewTaskForm onSubmit={handleFormSubmit} />
    </StyledFooter>
  );
};

export default Footer;

export type FormData = {
  taskTitle: string;
};
