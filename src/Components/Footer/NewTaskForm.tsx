import React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";

import { FormData } from "./index";
import AddTaskTextArea from "./AddTaskTextarea";
import addTaskPicture from "../../assets/img/addTask.svg";
import StyledButton from "../StyledComponents/StyledButton";

type Props = {
  onSubmit: (formData: FormData) => void;
};

const NewTaskForm: React.FC<InjectedFormProps<FormData, Props>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={AddTaskTextArea}
        name="taskTitle"
        type="text"
        placeholder="Что надо сделать"
      />
      <StyledButton picture={addTaskPicture} opacity={0.7} width="60px" />
    </form>
  );
};

export default reduxForm<FormData, Props>({ form: "newTask" })(NewTaskForm);
