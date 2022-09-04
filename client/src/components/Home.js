import "./Home.css";
import PostStatus from "./PostStatus";

export default function Home() {
  return (
    <div className="home">
      <div className="main">
        <PostStatus />
      </div>
    </div>
  );
}
