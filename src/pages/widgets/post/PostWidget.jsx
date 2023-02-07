import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Collapse,
  Divider,
  Paper,
  styled,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../state";

import Friend from "../../../components/Friend";

// Customized Styled props for Comments
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const color = red[500];
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[[loggedInUserId]]);
  const likeCount = Object.keys(likes).length;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Fetching the data from server_side using Fetch Method
  const patchLike = async () => {
    const response = await fetch(
      `https://mern-social-app-api-wza1.onrender.com/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    console.log(updatedPost);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Paper elevation={4}>
      <Card>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="500"
          image={`https://mern-social-app-api-wza1.onrender.com/assets/${picturePath}`}
          alt="Post Image"
          sx={{
            p: 2,
            borderRadius: "1.2rem",
          }}
        />

        <CardActions disableSpacing>
          <IconButton aria-label="like" onClick={patchLike}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: { color } }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <IconButton>
              <ChatOutlinedIcon />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Box mt="0.5rem">
              {comments.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}
              <Divider />
            </Box>
          </CardContent>
        </Collapse>
      </Card>
    </Paper>
  );
}
