import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import "./PostStatus.css";
import { useState } from "react";

export default function PostStatus() {
  const [newPostInput, setNewPostInput] = useState("");

  return (
    <div className="post-status">
      <div className="upper-part">
        <Avatar className="avatar" sx={{ width: 50, height: 50 }} />
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
        <Button className="button" variant="contained">
          Post
        </Button>
      </div>
    </div>
  );
}
