import { useState, useEffect } from "react";

function App() {
  const [position, setPosition] = useState([37.7749, -122.4194]);
  const [miData, setMiData] = useState({ name: "Xabier", subName: "Garrido" });

  const handleButtonClick = () => {
    // Construimos la URL con los datos que queremos enviar a la app
    const data = `myapp://?name=${miData.name}&subName=${miData.subName}`;
    window.location.href = data; // Esto enviará los datos a la app y la abrirá
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 1221212,
          height: 50,
          width: "100%",
          backgroundColor: "red",
        }}
      >
        <button onClick={handleButtonClick}>Enviar Datos a la App</button>
      </div>
    </div>
  );
}

export default App;
