import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Bienvenida from "./components/Bienvenida";
import Preguntas from "./components/Preguntas";
import Resultado from "./components/Resultado";
import PanelAdmin from "./pages/PanelAdmin";

function App() {
  const [etapa, setEtapa] = useState("inicio");
  const [nombre, setNombre] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [respuestas, setRespuestas] = useState([]);

  const comenzarTrivia = (nombreUsuario) => {
    setNombre(nombreUsuario);
    setEtapa("preguntas");
  };

  const finalizarTrivia = (puntajeTotal, respuestasUsuario) => {
    setPuntaje(puntajeTotal);
    setRespuestas(respuestasUsuario);
    setEtapa("resultado");
  };

  const renderFlujoTrivia = () => {
    if (etapa === "inicio") return <Bienvenida onComenzar={comenzarTrivia} />;
    if (etapa === "preguntas")
      return <Preguntas onFinalizar={finalizarTrivia} />;
    if (etapa === "resultado")
      return (
        <Resultado nombre={nombre} puntaje={puntaje} respuestas={respuestas} />
      );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={renderFlujoTrivia()} />
        <Route path="/resultados" element={<PanelAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
