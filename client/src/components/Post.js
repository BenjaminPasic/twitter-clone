import { Avatar } from "@mui/material";
import "./Post.css";

export default function Post({ postBody, username, date }) {
  return (
    <div className="post">
      <Avatar className="avatar" sx={{ width: 50, height: 50 }} />
      <div className="post-data">
        <p className="username">{username}</p>
        <p className="date">16 Apr</p>
        <p className="post-body">{postBody}</p>
      </div>
    </div>
  );
}
