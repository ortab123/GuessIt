import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "./AuthContext";

const ChildrenContext = createContext();

export function ChildrenProvider({ children }) {
  const { state } = useAuth();
  const [childList, setChildList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetchChildren();
  }, [state.session?.user]);

  const fetchChildren = async () => {
    setLoading(true);
    setErr("");
    if (!state.session?.user) {
      setErr("Not logged in");
      setChildList([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from("Children")
      .select("id,name,age,total_play_time,correct_answers,wrong_answers")
      .eq("parent_id", state.session.user.id)
      .order("created_at", { ascending: true });
    if (error) setErr(error.message);
    setChildList(data || []);
    setLoading(false);
  };

  const addChild = async (newChild) => {
    if (!state.session?.user) return;
    const { error } = await supabase.from("Children").insert([
      {
        parent_id: state.session.user.id,
        name: newChild.name,
        age: newChild.age,
      },
    ]);
    if (!error) await fetchChildren();
    return error;
  };

  const deleteChild = async (id) => {
    const { error } = await supabase.from("Children").delete().eq("id", id);
    if (!error) await fetchChildren();
    return error;
  };

  const updateChild = async (id, updatedData) => {
    const { error } = await supabase
      .from("Children")
      .update(updatedData)
      .eq("id", id);
    if (!error) await fetchChildren();
    return error;
  };

  const seedMockStats = async () => {
    if (!childList.length) return "No children to seed";

    const updates = childList.map((c) => {
      const totalTime = Math.floor(Math.random() * 180) + 30;
      const correct = Math.floor(Math.random() * 40) + 10;
      const wrong = Math.floor(Math.random() * 20);
      return {
        id: c.id,
        total_play_time: totalTime,
        correct_answers: correct,
        wrong_answers: wrong,
      };
    });

    for (const u of updates) {
      const { error } = await supabase
        .from("Children")
        .update({
          total_time_play: u.total_time_play,
          correct_answers: u.correct_answers,
          wrong_answers: u.wrong_answers,
        })
        .eq("id", u.id);
      if (error) return error.message;
    }

    await fetchChildren();
    return null;
  };

  return (
    <ChildrenContext.Provider
      value={{
        childList,
        loading,
        err,
        fetchChildren,
        addChild,
        deleteChild,
        updateChild,
        seedMockStats,
      }}
    >
      {children}
    </ChildrenContext.Provider>
  );
}

export function useChildren() {
  return useContext(ChildrenContext);
}
