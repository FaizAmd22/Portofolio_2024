import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import PageTransitionProvider from "./components/PageTransition";

function App() {
  return (
    <PageTransitionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<AllProjects />} />
      </Routes>
    </PageTransitionProvider>
  );
}

export default App;
