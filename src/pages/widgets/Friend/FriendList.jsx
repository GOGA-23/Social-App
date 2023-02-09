import {
  Box,
  Divider,
  Paper,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../../../components/Friend";
import { setFriends } from "../../../state/index";

const WidgetWrapper = styled(Box)({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  borderRadius: "0.75rem",
});

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const isNonMobileScreens = useMediaQuery("(min-width:980px)");

  // Fetching getFriends data from server_side
  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      position={isNonMobileScreens ? "fixed" : "static"}
      display={isNonMobileScreens ? "flex" : "none"}
    >
      <Paper elevation={4}>
        <WidgetWrapper>
          <Typography variant="h5" fontWeight="600" sx={{ mb: "0.5rem" }}>
            Friend List
          </Typography>
          <Divider />
          {friends.length > 0 ? (
            <Box display="flex" flexDirection="column" gap="1.5rem">
              {friends.map((friend) => (
                <Friend
                  key={friend._id}
                  friendId={friend._id}
                  name={`${friend.firstName} ${friend.lastName}`}
                  subtitle={friend.occupation}
                  userPicturePath={friend.picturePath}
                />
              ))}
            </Box>
          ) : (
            <Box>
              <img
                width="200"
                height="150"
                alt="advert"
                src={`${process.env.REACT_APP_SERVER_URL}/assets/no-friends.jpg`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
              />
            </Box>
          )}
        </WidgetWrapper>
      </Paper>
    </Box>
  );
};

export default FriendList;
