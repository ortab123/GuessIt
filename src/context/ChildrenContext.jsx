import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "./AuthContext";

const ChildrenContext = createContext();

export function ChildrenProvider({ children }) {
  const { state } = useAuth();
  const [childList, setChildList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

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
      .select("id,name,age")
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

  useEffect(() => {
    fetchChildren();
  }, [state.session?.user]);

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
      }}
    >
      {children}
    </ChildrenContext.Provider>
  );
}

export function useChildren() {
  return useContext(ChildrenContext);
}
