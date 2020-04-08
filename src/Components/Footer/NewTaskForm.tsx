import React from "react";
import { reduxForm, Field, InjectedFormProps } from "redux-form";

import { FormData } from "./index";

type Props = {
  onSubmit: (formData: FormData) => void;
};

const NewTaskForm: React.FC<InjectedFormProps<FormData, Props>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component="textarea"
        name="taskTitle"
        type="text"
        placeholder="Что надо сделать"
      />
      <button>Добавить</button>
    </form>
  );
};

export default reduxForm<FormData, Props>({ form: "newTask" })(NewTaskForm);
