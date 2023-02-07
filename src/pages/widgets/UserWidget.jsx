import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:980px)");

  // Fetching getUser data from server_side
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

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    friends,
    picturePath,
  } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <Box position={isNonMobileScreens ? "fixed" : "static"}>
      <Paper elevation={4}>
        <List
          sx={{
            width: "100%",
          }}
        >
          <ListItem
            secondaryAction={
              <IconButton edge="end">
                <AssignmentIndIcon />
              </IconButton>
            }
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <ListItemAvatar>
              <Avatar
                alt="User Image"
                src={`https://social-app-api-q1h4.onrender.com/assets/${picturePath}`}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={fullName}
              secondary={`${friends.length} friends`}
              sx={{
                "&:hover": {
                  color: "skyblue",
                  cursor: "pointer",
                },
              }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <LocationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={location} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <WorkOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={occupation} />
          </ListItem>
          <Divider />
          <ListItem secondaryAction={<ListItemText primary={viewedProfile} />}>
            <ListItemText primary="Who's viewed your profile" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListSubheader sx={{ fontSize: "1.2rem", padding: 0, margin: 0 }}>
              Social Profile
            </ListSubheader>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <AssignmentIndIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <TwitterIcon />
            </ListItemIcon>
            <ListItemText primary="Twitter" secondary="Social Network" />
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <AssignmentIndIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <LinkedInIcon />
            </ListItemIcon>
            <ListItemText primary="LinkedIn" secondary=" Network Platform" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default UserWidget;
