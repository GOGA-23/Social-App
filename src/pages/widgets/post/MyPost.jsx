import EditOutlined from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import AddPhotoAlternateSharpIcon from "@mui/icons-material/AddPhotoAlternateSharp";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { setPosts } from "../../../state/index";
import { useDispatch, useSelector } from "react-redux";
import FlexBox from "../../../components/FlexBox";

// Customized box div
const WidgetWrapper = styled(Box)({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  borderRadius: "0.75rem",
});

const MyPost = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  // Handle the post arrangement
  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    // Fetching the data from server_side using Fetch Method
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };
  return (
    <Paper elevation={4}>
      <WidgetWrapper>
        <FlexBox gap="1.2rem">
          <Avatar
            alt="User Image"
            src={`${process.env.REACT_APP_SERVER_URL}/assets/${picturePath}`}
            sx={{ width: 56, height: 56 }}
          />

          <TextField
            id="outlined-basic"
            label="Post Title"
            variant="outlined"
            placeholder="What's on Your Mind Now.."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
            }}
          />
        </FlexBox>
        {isImage && (
          <Box
            border={"1px solid lightgray"}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            {/* Uploading the picture from user using Dropzone  */}
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBox>
                  <Box
                    {...getRootProps()}
                    border={"3px dashed skyblue"}
                    width="100%"
                    p="1.2rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add picture Here...</p>
                    ) : (
                      <FlexBox>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBox>
                    )}
                  </Box>
                  {image && (
                    <Button
                      onClick={() => setImage(null)}
                      sx={{ width: "15%", color: "black" }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </Button>
                  )}
                </FlexBox>
              )}
            </Dropzone>
          </Box>
        )}
        <Divider sx={{ margin: "1.25rem 0" }} />
        <FlexBox>
          <Button
            variant="outlined"
            startIcon={<AddPhotoAlternateSharpIcon />}
            onClick={() => setIsImage(!isImage)}
          >
            Add Image
          </Button>
          <Button
            disabled={!post}
            onClick={handlePost}
            variant="contained"
            endIcon={<PostAddSharpIcon />}
          >
            Post
          </Button>
        </FlexBox>
      </WidgetWrapper>
    </Paper>
  );
};

export default MyPost;
