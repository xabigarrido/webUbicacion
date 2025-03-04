import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [position, setPosition] = useState([37.7749, -122.4194]); // Ubicación inicial (San Francisco)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      () => {
        alert("No se pudo obtener la ubicación");
        setLoading(false);
      }
    );
  }, []);

  const handleConfirm = () => {
    const urlParams = new URLSearchParams({
      lat: position[0],
      lng: position[1],
    });
    window.location.href = `exp://192.168.50.68:8081?${urlParams.toString()}`;
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {loading ? (
        <p>Cargando ubicación...</p>
      ) : (
        <MapContainer center={position} zoom={13} style={{ height: "90vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} />
        </MapContainer>
      )}
      <button onClick={handleConfirm} style={{ width: "100%", padding: 10 }}>
        Confirmar Ubicación
      </button>
    </div>
  );
}

export default App;
