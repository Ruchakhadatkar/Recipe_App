import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavPage from "./pages/FavPage";
import RecipeInfoPage from "./pages/RecipeInfoPage";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorite" element={<FavPage />} />
        <Route path="/recipe/:id" element={<RecipeInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
