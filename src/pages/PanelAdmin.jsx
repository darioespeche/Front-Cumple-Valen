import { useEffect, useState } from "react";
import "./PanelAdmin.css";

function PanelAdmin() {
  const [claveIngresada, setClaveIngresada] = useState("");
  const [accesoConcedido, setAccesoConcedido] = useState(false);
  const [datos, setDatos] = useState([]);

  const CLAVE_CORRECTA = "valen123";

  const manejarClave = () => {
    if (claveIngresada === CLAVE_CORRECTA) {
      setAccesoConcedido(true);
    } else {
      alert("Clave incorrecta.");
    }
  };

  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    if (accesoConcedido) {
      fetch(`${BACKEND_URL}/api/participantes`)
        .then((res) => res.json())
        .then((data) => setDatos(data))
        .catch((err) => console.error("Error al cargar datos", err));
    }
  }, [accesoConcedido]);

  if (!accesoConcedido) {
    return (
      <div className="login-panel">
        <h2>Panel de Resultados</h2>
        <p>Ingresá la clave para acceder:</p>
        <input
          type="password"
          value={claveIngresada}
          onChange={(e) => setClaveIngresada(e.target.value)}
        />
        <button onClick={manejarClave}>Ingresar</button>
      </div>
    );
  }

  return (
    <div className="panel-admin">
      <h2>Resultados de la trivia</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntaje</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((p, idx) => (
            <tr key={idx}>
              <td>{p.nombre}</td>
              <td>{p.puntaje}</td>
              <td>{new Date(p.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PanelAdmin;
