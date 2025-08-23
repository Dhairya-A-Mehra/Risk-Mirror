"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = { 
  width: '100%', 
  height: '100%' 
};

export function NearbyHospitalsMap({ city }: { city?: string }) {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const position = { lat: 19.0760, lng: 72.8777 };

  return (
    <Card className="bg-[rgba(15,23,42,0.6)] backdrop-blur-lg border border-blue-900/30 shadow-xl">
      <CardHeader>
        <CardTitle className="bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Nearby In-Network Hospitals</CardTitle>
      </CardHeader>
      <CardContent className="h-96 w-full p-0 overflow-hidden rounded-b-lg">
        {city ? (
         
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              center={position}
              zoom={12}
              mapContainerStyle={mapContainerStyle}
          
              options={{
                disableDefaultUI: true, 
                zoomControl: true,
              }}
            >
             
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
