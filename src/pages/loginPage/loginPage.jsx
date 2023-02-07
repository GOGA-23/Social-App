import {
  AppBar,
  Box,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileView = useMediaQuery("(min-width : 900px)");
  return (
    <Box>
      <AppBar>
        <Toolbar
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography fontWeight="bolder" fontSize="35px">
            SocialPath
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        p="2rem"
        m="4rem auto"
        borderRadius="1.8rem"
        width={isNonMobileView ? "40%" : "95%"}
      >
        <Paper
          elevation={2}
          sx={{
            p: "2.5rem",
          }}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to SocialPath, New Social Media Pack
          </Typography>
          {/* Getting Form component from another file */}
          <Form />
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginPage;
