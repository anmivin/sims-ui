import { ToastProvider, ToastContext, ThemeProvider, useToast } from "sims-ui";

import Component from "./compo";
function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Component />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
