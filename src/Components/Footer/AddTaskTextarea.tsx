import React, { useEffect } from "react";
import StyledAddTaskTextarea from "../StyledComponents/StyledAddTaskTextarea";

const TextArea = (props: any) => {
  const textareaRef = React.createRef<HTMLTextAreaElement>();
  const { setTextareaHeight } = props;

  useEffect(() => {
    console.log(`высота поменялась ${textareaRef.current?.style.height}`);
    setTextareaHeight(textareaRef.current?.style.height);
  }, [setTextareaHeight, textareaRef]);

  const changeTextareaHeight = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 2 + "px";
    } else {
      alert("fa");
    }
  };

  return (
    <StyledAddTaskTextarea
      {...props.input}
      {...props.meta}
      type={props.type}
      placeholder={props.placeholder}
      ref={textareaRef}
      onInput={changeTextareaHeight}
    />
  );
};

export default TextArea;
