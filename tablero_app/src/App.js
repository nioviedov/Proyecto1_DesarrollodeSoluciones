import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Predict from "./pages/Predict";
import History from "./pages/History";
import Data from "./pages/Data";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Prediccion</Link> | <Link to="/history">Historico</Link> | <Link to="/data">Datos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Predict />} />
        <Route path="/history" element={<History />} />
        <Route path="/data" element={<Data />} />
      </Routes>
    </Router>
  );
}

export default App;