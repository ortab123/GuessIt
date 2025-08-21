import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AuthProvider } from "./context/AuthContext"
import { ChildrenProvider } from "./context/ChildrenContext"
import "./index.css"
import App from "./App.jsx"

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChildrenProvider>
      <App />
    </ChildrenProvider>{" "}
  </AuthProvider>
)
