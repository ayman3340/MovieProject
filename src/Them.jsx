import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorScheme } from "@mui/material/styles";

function Them() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null; // still loading
  }

  return (
    <Box>
      <Button
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        sx={{
          minWidth: "40px",
          color:"text.primary",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </Button>
    </Box>
  );
}

export default Them;
