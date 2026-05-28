import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectBoard from "./pages/ProjectBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<ProjectBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
