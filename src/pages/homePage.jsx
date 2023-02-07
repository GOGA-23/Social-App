import { useSelector } from "react-redux";
import NavBar from "../pages/navBar";
import UserWidget from "./widgets/UserWidget";
import FriendList from "./widgets/Friend/FriendList";
import PostsWidget from "./widgets/post/PostsWidget";
import { Box, Stack, useMediaQuery } from "@mui/material";
import MyPost from "./widgets/post/MyPost";

export const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:980px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar userId={_id} picturePath={picturePath} />
      <Stack
        width="100%"
        padding="6rem 5%"
        display="flex"
        flexWrap="wrap"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="space-evenly"
        alignItems={isNonMobileScreens ? "flex-start" : "center"}
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined} width="95%">
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          display="flex"
          flexDirection="column"
          gap="2rem"
        >
          <MyPost picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined} ml={3}>
          <FriendList userId={_id} />
        </Box>
      </Stack>
    </Box>
  );
};

export default HomePage;
