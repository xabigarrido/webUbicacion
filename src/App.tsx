// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";

// function App() {
//   const [position, setPosition] = useState<LatLngExpression>([
//     37.7749, -122.4194,
//   ]); // Ubicación inicial (San Francisco)
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//         setLoading(false);
//       },
//       () => {
//         alert("No se pudo obtener la ubicación");
//         setLoading(false);
//       }
//     );
//   }, []);

//   // Función para enviar datos a la app
//   const handleSendLocation = () => {
//     const locationData = {
//       latitude: position[0],
//       longitude: position[1],
//     };

//     // Enviar los datos de la ubicación al WebView
//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage(JSON.stringify(locationData));
//     }
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       {loading ? (
//         <p>Cargando ubicación...</p>
//       ) : (
//         <>
//           <MapContainer center={position} zoom={20} style={{ height: "90%" }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker position={position}>
//               <Popup>¡Estás aquí!</Popup>
//             </Marker>
//           </MapContainer>
//           <button
//             onClick={handleSendLocation}
//             style={{ position: "absolute", bottom: 20, left: 20 }}
//           >
//             Enviar Ubicación
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

// import { useEffect, useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Circle,
//   useMapEvents,
// } from "react-leaflet";
// import { LatLngExpression, LeafletEvent } from "leaflet";
// import "leaflet/dist/leaflet.css";

// function ClickHandler({
//   onMapClick,
// }: {
//   onMapClick: (e: LeafletEvent) => void;
// }) {
//   useMapEvents({
//     click(e) {
//       console.log("llege");
//       onMapClick(e);
//     },
//   });
//   return null;
// }

// function App() {
//   const [position, setPosition] = useState<LatLngExpression>([
//     37.7749, -122.4194,
//   ]);
//   const [markers, setMarkers] = useState<LatLngExpression[]>([]);
//   const [loading, setLoading] = useState(true);
//   const rangeInMeters = 200; // Radio en metros

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setPosition([pos.coords.latitude, pos.coords.longitude]);
//         setLoading(false);
//       },
//       () => {
//         alert("No se pudo obtener la ubicación");
//         setLoading(false);
//       }
//     );
//   }, []);

//   const handleMapClick = (event: LeafletEvent) => {
//     const { latlng } = event;
//     const newMarker: LatLngExpression = [latlng.lat, latlng.lng];
//     setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
//   };

//   return (
//     <div style={{ height: "100vh", width: "100vw" }}>
//       {loading ? (
//         <p>Cargando ubicación...</p>
//       ) : (
//         <MapContainer
//           center={position}
//           zoom={15}
//           style={{ height: "100%" }}
//           onClick={handleMapClick}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={position}>
//             <Popup>¡Estás aquí!</Popup>
//           </Marker>
//           {/* Dibujar un círculo de 500 metros alrededor de la posición actual */}
//           <Circle
//             center={position}
//             radius={rangeInMeters}
//             pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
//           />
//           {markers.map((marker, index) => (
//             <Marker key={index} position={marker}>
//               <Popup>Marcador #{index + 1}</Popup>
//             </Marker>
//           ))}
//           <ClickHandler onMapClick={handleMapClick} />
//         </MapContainer>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, LeafletEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

function AutoPopupMarker({ position }: { position: LatLngExpression }) {
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Esperamos 500ms para asegurarnos de que el marcador se haya renderizado
    const timer = setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [markerRef]);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>¡Estás aquí!</Popup>
    </Marker>
  );
}
function ClickHandler({
  onMapClick,
}: {
  onMapClick: (e: LeafletEvent) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e);
    },
  });
  return null;
}
export default function App() {
  const [position, setPosition] = useState<LatLngExpression>([
    37.7749, -122.4194,
  ]); // San Francisco inicial
  const [loading, setLoading] = useState(true);
  const [metrosRange, setMetrosRange] = useState(500);
  const [marker, setMarker] = useState<LatLngExpression>([37.7749, -122.4194]); // San Francisco inicial

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation: LatLngExpression = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];

        setPosition(userLocation);
        setMarker(userLocation); // Aseguramos que el marcador también tenga la ubicación inicial
        setLoading(false);
      },
      () => {
        alert("No se pudo obtener la ubicación");
        setLoading(false);
      }
    );
  }, []);
  const handleMapClick = (event: LeafletEvent) => {
    const { lat, lng } = event.latlng;
    setMarker([lat, lng]); // Guarda solo un marcador
  };
  const handleSendLocation = () => {
    const miData = { ubicacionEmpresa: marker, metrosRange };

    // Enviar los datos de la ubicación al WebView
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(miData));
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <p>Cargando ubicación...</p>
      ) : (
        <>
          {/* Contenedor superior con input y botón */}
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              textAlign: "center",
              position: "fixed",
              zIndex: 890890,
            }}
          >
            <p style={{ fontSize: 20 }}>Marca el lugar de tu empresa</p>
            <p style={{ fontSize: 16 }}>
              Metros de distancia para poder acceder
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  type="number"
                  inputMode="numeric"
                  style={{ padding: 10 }}
                  placeholder="500 metros"
                  onChange={(event) => setMetrosRange(event.target.value)}
                />
                <button onClick={handleSendLocation}>Agregar ubicación</button>
              </div>
            </div>
          </div>

          {/* Contenedor del mapa que ocupa todo el espacio restante */}
          <div style={{ flexGrow: 1 }}>
            <MapContainer
              center={position}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
              onClick={handleMapClick}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <AutoPopupMarker position={position} />

              {marker && (
                <>
                  <Marker position={marker}>
                    <Popup>Ubicación seleccionada</Popup>
                  </Marker>
                  <Circle
                    center={marker}
                    radius={metrosRange}
                    pathOptions={{
                      color: "blue",
                      fillColor: "blue",
                      fillOpacity: 0.2,
                    }}
                  />
                </>
              )}
              <ClickHandler onMapClick={handleMapClick} />
            </MapContainer>
          </div>
        </>
      )}
    </div>
  );
}
