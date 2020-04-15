import React, { useEffect, useState } from "react";

import StyledAddTaskTextarea from "../StyledComponents/StyledAddTaskTextarea";

const TextArea = (props: any) => {
  const [textareaScrollHeight, setTextareaScrollHeight] = useState("auto");
  const textareaRef = React.createRef<HTMLTextAreaElement>();

  useEffect(() => {
    const scrollHeight = textareaRef.current?.scrollHeight;

    if (scrollHeight !== parseInt(textareaScrollHeight)) {
      setTextareaScrollHeight(`${scrollHeight}px`);
    }
  }, [textareaScrollHeight, textareaRef]);

  return (
    <StyledAddTaskTextarea
      {...props.input}
      {...props.meta}
      type={props.type}
      placeholder={props.placeholder}
      ref={textareaRef}
      textareaHeight={textareaScrollHeight}
    />
  );
};

export default TextArea;
