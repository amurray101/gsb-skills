import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SkillDetail from "./pages/SkillDetail";
import BuildYourOwnAgent from "./pages/BuildYourOwnAgent";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/skills/:slug" element={<SkillDetail />} />
        <Route path="/build-your-own-agent" element={<BuildYourOwnAgent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </HashRouter>
  );
}
