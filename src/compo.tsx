import { useRef, useState, useContext } from "react";
import { ToastProvider, ToastContext, ThemeProvider, useToast } from "sims-ui";
const Component = () => {
  const { addToast } = useToast();
  const { addToast: dkd } = useContext(ToastContext);

  return (
    <>
      <button onClick={() => console.log(addToast, typeof addToast, dkd, typeof dkd)}>
        success
      </button>
      <button
        onClick={() =>
          addToast({
            level: "success",
            children:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
          })
        }
      >
        success
      </button>
      <button
        onClick={() =>
          addToast({
            level: "error",
            children: "Lorem ipsum dolor sit ame",
          })
        }
      >
        error
      </button>
    </>
  );
};
export default Component;
