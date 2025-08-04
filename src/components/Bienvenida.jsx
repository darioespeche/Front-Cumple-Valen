import { useState } from "react";

function Bienvenida({ onComenzar }) {
  const [nombre, setNombre] = useState("");

  const manejarClick = () => {
    if (nombre.trim()) {
      onComenzar(nombre.trim());
    }
  };

  return (
    <div className="bienvenida">
      <h1>¡Hola! Soy la IA de Valen 🎉</h1>
      <p>¿Cómo te llamás?</p>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribí tu nombre..."
      />
      <button onClick={manejarClick}>Comenzar</button>
    </div>
  );
}

export default Bienvenida;
