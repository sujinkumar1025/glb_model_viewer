// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import ViewerPage from "./pages/ViewerPage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Upload</Link> | <Link to="/viewer">Viewer</Link>
        </nav>
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/viewer" element={<ViewerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
