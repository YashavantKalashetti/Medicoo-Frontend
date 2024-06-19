import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default icon issues in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RouteMap = ({ sourceLocation, destinationLocation }) => {
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const apiKey = ""; // Replace with your OpenRouteService API key
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${sourceLocation.lng},${sourceLocation.lat}&end=${destinationLocation.lng},${destinationLocation.lat}`;
      
      try {
        const response = await axios.get(url);
        const coordinates = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        setRoute(coordinates);
        setDistance(response.data.features[0].properties.segments[0].distance / 1000); // Distance in kilometers
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, [sourceLocation, destinationLocation]);

  return (
    <MapContainer center={[sourceLocation.lat, sourceLocation.lng]} zoom={14} style={{ height: '60vh', width: '70%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[sourceLocation.lat, sourceLocation.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
      <Marker position={[destinationLocation.lat, destinationLocation.lng]}>
        <Popup>Other User Location</Popup>
      </Marker>
      {route && <Polyline positions={route} color="blue" />}
      {distance && (
        <Popup position={route[Math.floor(route.length / 2)]}>
          <div>Distance: {distance.toFixed(2)} km</div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default RouteMap;