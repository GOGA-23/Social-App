import { useSelector } from "react-redux";
import NavBar from "../pages/navBar";
import UserWidget from "./widgets/UserWidget";
import FriendList from "./widgets/Friend/FriendList";
import PostsWidget from "./widgets/post/PostsWidget";
import { Box, useMediaQuery } from "@mui/material";
import MyPost from "./widgets/post/MyPost";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:980px)");

  const getUser = async () => {
    const response = await fetch(
      `https://social-app-api-q1h4.onrender.com/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <NavBar picturePath={user.picturePath} />
      <Box
        width="100%"
        padding="6rem 0"
        display="flex"
        flexWrap="wrap"
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="space-evenly"
        alignItems={isNonMobileScreens ? "flex-start" : "center"}
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined} width="90%">
          <UserWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          display="flex"
          flexDirection="column"
          gap="2rem"
        >
          <MyPost picturePath={user.picturePath} />
          <PostsWidget userId={userId} isProfile />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined} ml={3}>
          <FriendList userId={userId} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
