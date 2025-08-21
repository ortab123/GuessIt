import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";


export default function WhoIsPlaying() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    // Fetch the list of children 
    const fetchChildren = async () => {
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (userErr) { setErr(userErr.message); return; }
      if (!user)    { setErr("Not logged in"); return; }

      const { data, error } = await supabase
        .from("Children")
        .select("id,name,age")
        .eq("parent_id", user.id)
        .order("created_at", { ascending: true });

      if (error) setErr(error.message);
      else setChildren(data || []);
    };
    fetchChildren();
  }, []);

  return (
    <div className="who-container">
        <h2>Who’s playing?</h2>

        <div className="who-card">
          <button className="player" onClick={() => navigate("/parent")}>
            <div className="parent">👤</div>
            <span>Parent</span>
          </button>

          {err && <div>{err}</div>}

          {children.map((c) => (
          <button
            key={c.id}
            className="player"
            onClick={() => navigate(`/child/${c.id}`)}
          >
            <div className="child">👦</div>
            <span>{c.name}</span>
          </button>
        ))}

          <button className="player" onClick={() => navigate("/add")}>
            <div className="plus">＋</div>
            <span>Plus</span>
          </button>
        </div>
      </div>
  );
}
