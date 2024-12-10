import { StrictMode, } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Index from "./routes/index";
import Login from "./routes/login";
import Register from "./routes/register";
import Profile from "./routes/profile";
import Layout from "./components/global-components/Layout";
import FindMusician from "./routes/find-musician";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
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
  </StrictMode>
);


