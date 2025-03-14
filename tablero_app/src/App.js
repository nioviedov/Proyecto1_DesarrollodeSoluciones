import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Predict from "./pages/Predict";
import History from "./pages/History";
import Data from "./pages/Data";
import { useEffect, useState } from "react";

function App() {
  const [username, setUsername] = useState(undefined)
  const requestUsername=()=>{
    if(!localStorage.getItem('username')){

      const valor = window.prompt("Ingresa tu nombre:");
      if (valor) {
        localStorage.setItem('username',valor)
        setUsername(valor);
      }
      else{
        requestUsername();
      }
    }
    else{
      setUsername(localStorage.getItem('username'))
    }
  }
  useEffect(()=>{
    console.log("AQUI22")
   requestUsername();
  })

  const clearUsername = ()=>{
    localStorage.removeItem('username')
    requestUsername();
  }
  return (
    <Router>
      <nav className="p-2 flex items-center justify-between">
        <Link to="/">Prediccion</Link> | <Link to="/history">Historico</Link> | <Link to="/data">Datos</Link> |
        {username?<div className="ml-auto">
          <span>Usuario: {username}</span>
          <button  className="ml-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition" onClick={clearUsername}>Cambiar Usuario</button>
        </div>:'Sin nombre de usuario'}
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