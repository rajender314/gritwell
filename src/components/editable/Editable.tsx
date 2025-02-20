import React, { useEffect, useState } from "react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  ...props
}:any) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
// Exercise: It can be made dynamic by accepting initial state as props outside the component 
  const [isEditing, setEditing] = useState(false);

// Event handler while pressing any key while editing
  const handleKeyDown = (event:any, type:string) => {
    // Handle when key is pressed
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
      props.saveData()
    }
  };

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);


/*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <section {...props} className="EditableComponent">
      {isEditing ? (
        <div
          className="after-edit"
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          
          onClick={() => setEditing(true)}
          className="before-edit"
        >
          <p >
          {text || placeholder || "Click here to type"}
          </p>
        </div>
      )}
    </section>
  );
};

export default Editable;