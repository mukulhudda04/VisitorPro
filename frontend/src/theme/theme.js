import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "light") => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        main: "#2563EB",
      },

      secondary: {
        main: "#14B8A6",
      },

      success: {
        main: "#22C55E",
      },

      warning: {
        main: "#F59E0B",
      },

      error: {
        main: "#EF4444",
      },

      background: {
        default: isDark ? "#0F172A" : "#F3F6FB",
        paper: isDark ? "#1E293B" : "#FFFFFF",
      },

      text: {
        primary: isDark ? "#F8FAFC" : "#0F172A",
        secondary: isDark ? "#CBD5E1" : "#64748B",
      },

      divider: isDark ? "#334155" : "#E2E8F0",
    },

    shape: {
      borderRadius: 14,
    },

    typography: {
      fontFamily: `"Inter", "Roboto", sans-serif`,

      h4: {
        fontWeight: 700,
      },

      h5: {
        fontWeight: 700,
      },

      h6: {
        fontWeight: 600,
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? "#0F172A" : "#F3F6FB",
            color: isDark ? "#F8FAFC" : "#0F172A",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
            boxShadow: isDark
              ? "0 6px 18px rgba(0,0,0,0.30)"
              : "0 6px 18px rgba(0,0,0,0.08)",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: "10px 18px",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#334155" : "#F8FAFC",
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: isDark ? "#475569" : "#CBD5E1",
              },
            },
          },
        },
      },
    },
  });
};

export default getTheme;