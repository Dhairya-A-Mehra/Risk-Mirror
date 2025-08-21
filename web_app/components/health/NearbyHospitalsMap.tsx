"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// We need to import LoadScript as well for this library to work
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

// This should be outside the component to avoid re-rendering
const mapContainerStyle = { 
  width: '100%', 
  height: '100%' 
};

export function NearbyHospitalsMap({ city }: { city?: string }) {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  // In a real app, you would use an API to get lat/lon from the city name.
  // We'll use a default position for Mumbai.
  const position = { lat: 19.0760, lng: 72.8777 };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby In-Network Hospitals</CardTitle>
      </CardHeader>
      <CardContent className="h-96 w-full p-0 overflow-hidden rounded-b-lg">
        {city ? (
          // The LoadScript component is required to load the Google Maps API script
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              center={position}
              zoom={12}
              mapContainerStyle={mapContainerStyle}
              // We remove the props that caused the error: mapId and mapContainerClassName
              // Custom map styles can be passed via the 'options' prop if needed
              options={{
                disableDefaultUI: true, // Hides default controls for a cleaner look
                zoomControl: true,
              }}
            >
              {/* Dummy marker for a hospital */}
              <Marker position={position} title={'Example Hospital'} />
            </GoogleMap>
          </LoadScript>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Please add a city to your profile to see nearby hospitals.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}