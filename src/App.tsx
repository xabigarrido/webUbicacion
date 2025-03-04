import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        alert("No se pudo obtener la ubicación");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {loading ? (
        <p>Cargando ubicación...</p>
      ) : (
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          style={{ height: "100vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[position.lat, position.lng]} />
        </MapContainer>
      )}
      <button style={{ width: "100%", padding: 10 }}>
        Confirmar Ubicación
      </button>
    </div>
  );
}

export default App;
