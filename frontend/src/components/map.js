import { SkeletonText } from "@chakra-ui/react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  DirectionsService,
  DistanceMatrixService,
} from "@react-google-maps/api";
import { useRef, useState, useEffect, memo, useLayoutEffect } from "react";


function App({ callback, places, setPlaces }) {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  function clearRoute() {
    setDirectionsResponse(null);
    if (places.origin === "") {
      setPlaces((prev) => ({ ...prev, distance: 0, origin_obj: null }));
    } else if (places.destination === "") {
      setPlaces((prev) => ({ ...prev, distance: 0, dest_obj: null }));
    }
  }

  useLayoutEffect(() => {
    if (
      (places.origin === "" || places.destination === "") &&
      places.distance !== 0
    ) {
      clearRoute();
    }
  }, [places]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    
    // Check if the browser supports Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported in this browser.');
    }
  }, []);
  
  const center = { lat: latitude, lng: longitude };

function get_driver_location() {
  fetch('https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/location.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Assuming 'data' is an object with multiple entries, extract latitude and longitude
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const entry = data[key];
          var driver_latitude = entry.latitude;
          var driver_longitude = entry.longitude;
          console.log('Latitude:', driver_latitude);
          console.log('Longitude:', driver_longitude);
        }
      }
    })
    .catch(error => {
      console.error('Error fetching location data from Firebase:', error.message);
    });
}
  
  useEffect(() => {
    // Check if latitude and longitude are available
    if (latitude && longitude && map) {
      console.log("Fetching from database");
      // Create a new marker for the user's location
   
      console.log("Fetching driver's location")
    fetch('https://driverbazar-543a6-default-rtdb.asia-southeast1.firebasedatabase.app/location.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      // Assuming 'data' is an object with multiple entries, extract latitude and longitude
      for (const key in data) {
          const entry = data[key];
          let driver_latitude = entry.latitude;
          let driver_longitude = entry.longitude;
          console.log('Latitude:', driver_latitude);
          console.log('Longitude:', driver_longitude);
          new window.google.maps.Marker({
            position: { lat: driver_latitude, lng: driver_longitude },
            map: map,
            title: 'Driver Location',
          });
      }
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'Your Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue marker icon URL
        },
      });
    })
    .catch(error => {
      console.error('Error fetching location data from Firebase:', error.message);
    });
  }
  }, [latitude, longitude, map]);
  
  
  return (
    <GoogleMap
      id="map"
      center={
        places.origin_obj?.geometry.location.toJSON() ||
        places.dest_obj?.geometry.location.toJSON() ||
        center
      }
      zoom={15}
      mapContainerStyle={{
        width: "61vw",
        height: "75vh",
        borderRadius: "18px",
        padding: 0,
      }}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={(map) => {
        setMap(map);
        callback(true);
      }}
    >
      {places.origin !== null &&
        places.destination !== null &&
        places.origin !== "" &&
        places.destination !== "" &&
        directionsResponse === null && (
          <DirectionsService
            options={{
              origin: places.origin,
              destination: places.destination,
              travelMode: "DRIVING",
            }}
            callback={(res) => {
              if (res !== null && res.status === "OK") {
                setDirectionsResponse(res);
              } else {
                console.log(res);
              }
            }}
          />
        )}
      {places.origin !== null &&
        places.destination !== null &&
        places.origin !== "" &&
        places.destination !== "" && (
          <DirectionsRenderer 
          options={{ 
            directions: directionsResponse,
            strokeColor: "blue", 
            provideRouteAlternatives: true,
           }} />
        )}

      {directionsResponse && places.distance === 0 && (
        <DistanceMatrixService
          options={{
            origins: [places.origin],
            destinations: [places.destination],
            travelMode: "DRIVING",
          }}
          callback={(res) => {
            setPlaces((prev) => ({ ...prev, distance: res.rows[0].elements[0].distance.value }));
          }}
        />
      )}

      {places.origin_obj !== null && directionsResponse === null && (
        <Marker position={places.origin_obj?.geometry.location.toJSON()} />
      )}

      {places.dest_obj !== null && directionsResponse === null && (
        <Marker position={places.dest_obj?.geometry.location.toJSON()} />
      )}
    </GoogleMap>
  );
}

export default App;

// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   DirectionsService,
//   DistanceMatrixService,
// } from "@react-google-maps/api";
// import { useRef, useState, useEffect, memo, useLayoutEffect } from "react";


// function App({ callback, places, setPlaces }) {
//   const [map, setMap] = useState(null);
//   const [directionsResponse, setDirectionsResponse] = useState(null);

//   function clearRoute() {
//     setDirectionsResponse(null);
//     if (places.origin === "") {
//       setPlaces((prev) => ({ ...prev, distance: 0, origin_obj: null }));
//     } else if (places.destination === "") {
//       setPlaces((prev) => ({ ...prev, distance: 0, dest_obj: null }));
//     }
//   }

//   useLayoutEffect(() => {
//     if (
//       (places.origin === "" || places.destination === "") &&
//       places.distance !== 0
//     ) {
//       clearRoute();
//     }
//   }, [places]);
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   useEffect(() => {
    
//     // Check if the browser supports Geolocation
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       console.log('Geolocation is not supported in this browser.');
//     }
//   }, []);
  
//   const center = { lat: latitude, lng: longitude };
//   useEffect(() => {
//     if (!latitude || !longitude) return; // Check if latitude and longitude are available

//     // Initialize the map
//     const map = new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: latitude, lng: longitude },
//       zoom: 12, // Adjust the zoom level as needed
//     });

//     // Add a marker to the map
//     new window.google.maps.Marker({
//       position: { lat: latitude, lng: longitude },
//       map: map,
//       title: 'Your Location',
//     });
//   },[]);
  
//   return (
//     <GoogleMap
//       id="map"
//       center={
//         places.origin_obj?.geometry.location.toJSON() ||
//         places.dest_obj?.geometry.location.toJSON() ||
//         center
//       }
//       zoom={15}
//       mapContainerStyle={{
//         width: "61vw",
//         height: "75vh",
//         borderRadius: "18px",
//         padding: 0,
//       }}
//       options={{
//         zoomControl: true,
//         streetViewControl: false,
//         mapTypeControl: false,
//         fullscreenControl: false,
//       }}
//       onLoad={(map) => {
//         setMap(map);
//         callback(true);
//       }}
//     >
//       {places.origin !== null &&
//         places.destination !== null &&
//         places.origin !== "" &&
//         places.destination !== "" &&
//         directionsResponse === null && (
//           <DirectionsService
//             options={{
//               origin: places.origin,
//               destination: places.destination,
//               travelMode: "DRIVING",
//             }}
//             callback={(res) => {
//               if (res !== null && res.status === "OK") {
//                 setDirectionsResponse(res);
//               } else {
//                 console.log(res);
//               }
//             }}
//           />
//         )}
//       {places.origin !== null &&
//         places.destination !== null &&
//         places.origin !== "" &&
//         places.destination !== "" && (
//           <DirectionsRenderer 
//           options={{ 
//             directions: directionsResponse,
//             provideRouteAlternatives: true,
//            }} />
//         )}

//       {directionsResponse && places.distance === 0 && (
//         <DistanceMatrixService
//           options={{
//             origins: [places.origin],
//             destinations: [places.destination],
//             travelMode: "DRIVING",
//           }}
//           callback={(res) => {
//             setPlaces((prev) => ({ ...prev, distance: res.rows[0].elements[0].distance.value }));
//           }}
//         />
//       )}

//       {places.origin_obj !== null && directionsResponse === null && (
//         <Marker position={places.origin_obj?.geometry.location.toJSON()} />
//       )}

//       {places.dest_obj !== null && directionsResponse === null && (
//         <Marker position={places.dest_obj?.geometry.location.toJSON()} />
//       )}
//     </GoogleMap>
//   );
// }

// export default App;

