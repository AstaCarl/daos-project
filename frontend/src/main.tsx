import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./routes/index";
import Login from "./routes/login";
import Register from "./routes/register";
import Profile from "./routes/profile";
import Layout from "./components/global-components/Layout";
import FindMusician from "./routes/find-musician";

// main tsx file for the frontend, defines the routes and renders the layout

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    {/* Layout wraps the content and contains the global components, like header and footer */}
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/find-musician" element={<FindMusician />} />
      </Routes>
      </Layout>
    </BrowserRouter>
);


