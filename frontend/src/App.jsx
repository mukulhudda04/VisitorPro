import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import getTheme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [mode, setMode] = useState(
    localStorage.getItem("visitorpro_theme") || "light"
  );

  useEffect(() => {
    const handleThemeChange = (event) => {
      setMode(event.detail);
    };

    window.addEventListener(
      "visitorpro-theme-change",
      handleThemeChange
    );

    return () => {
      window.removeEventListener(
        "visitorpro-theme-change",
        handleThemeChange
      );
    };
  }, []);

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;