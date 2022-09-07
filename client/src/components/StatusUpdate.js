import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import "./StatusUpdate.css";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function StatusUpdate({ handleNewLocalPost }) {
  const { userInfo } = useAuth();
  const [newPostInput, setNewPostInput] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/post/addNewPost",
        {
          post: newPostInput,
          user_id: userInfo.user_id,
        },
        {
          headers: { auth: localStorage.getItem("token") },
        }
      );
      handleNewLocalPost({
        id: res.data.id,
        post: res.data.post,
        username: userInfo.username,
        createdAt: res.data.createdAt,
      });
    } catch (error) {
      if (error?.response?.data?.error === "Invalid token") {
        window.location.href = "/login";
      }
    }

    setNewPostInput("");
  };

  return (
    <div className="post-status">
      <div className="upper-part">
        <Avatar className="avatar" sx={{ width: 50, height: 50 }}>
          {userInfo?.username?.substring(0, 1)}
        </Avatar>
        <TextField
          onChange={(e) => setNewPostInput(e.target.value)}
          value={newPostInput}
          className="text-field"
          multiline
          id="standard-basic"
          label="What's on your mind today?"
          variant="standard"
          fullWidth
          size="medium"
        />
      </div>
      <div className="lower-part">
        <Button onClick={handleSubmit} className="button" variant="contained">
          Post
        </Button>
      </div>
    </div>
  );
}
