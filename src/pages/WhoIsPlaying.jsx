import { useNavigate } from "react-router-dom";

export default function WhoIsPlaying() {
  const navigate = useNavigate();

  return (
    <div className="who-container">
        <h2>Who’s playing?</h2>

        <div className="who-card">
          <button className="player" onClick={() => navigate("/parent")}>
            <div className="parent">👤</div>
            <span>Parent</span>
          </button>

          <button className="player" onClick={() => navigate("/child")}>
            <div className="child">👦</div>
            <span>Child</span>
          </button>

          <button className="player" onClick={() => navigate("/add")}>
            <div className="plus">＋</div>
            <span>Plus</span>
          </button>
        </div>
      </div>
  );
}
