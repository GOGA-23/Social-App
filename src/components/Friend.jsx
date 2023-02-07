import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Avatar,
} from "@mui/material";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";

export default function Friend({ friendId, name, subtitle, userPicturePath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  // Fetching data for patch friend from server side using fetch method
  const patchFriend = async () => {
    const response = await fetch(
      `https://social-app-api-q1h4.onrender.com/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <List sx={{ width: "100%" }}>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => patchFriend()}
          >
            {isFriend ? (
              <PersonRemoveOutlinedIcon />
            ) : (
              <PersonAddAltOutlinedIcon />
            )}
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            alt="User Image"
            src={`https://social-app-api-q1h4.onrender.com/assets/${userPicturePath}`}
            sx={{ width: 40, height: 40 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={subtitle}
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
          sx={{
            "&:hover": {
              color: "skyblue",
              cursor: "pointer",
            },
          }}
        />
      </ListItem>
    </List>
  );
}
