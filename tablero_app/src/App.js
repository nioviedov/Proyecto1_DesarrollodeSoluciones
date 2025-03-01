import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Predict from "./pages/Predict";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Predict</Link> | <Link to="/history">History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Predict />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;