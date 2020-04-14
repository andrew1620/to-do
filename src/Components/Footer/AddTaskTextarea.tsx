import React, { useState, useEffect } from "react";

import StyledAddTaskTextarea from "../StyledComponents/StyledAddTaskTextarea";

const TextArea = (props: any) => {
  const textareaRef = React.createRef<HTMLTextAreaElement>();
  const [textareaScrollHeight, setTextareaScrollHeight] = useState("auto");

  useEffect(() => {
    const scrollHeight = textareaRef.current?.scrollHeight;
    if (scrollHeight !== parseInt(textareaScrollHeight)) {
      setTextareaScrollHeight(`${scrollHeight}px` || "auto");
    }
  });
  const returnHeight = () => {
    setTextareaScrollHeight("50px");
  };

  return (
    <StyledAddTaskTextarea
      {...props.input}
      {...props.meta}
      type={props.type}
      placeholder={props.placeholder}
      ref={textareaRef}
      textareaHeight={textareaScrollHeight}
      onBlur={returnHeight}
    />
  );
};

export default TextArea;
