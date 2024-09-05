<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import mapboxgl from 'mapbox-gl';
// Importer le CSS de Mapbox
import 'mapbox-gl/dist/mapbox-gl.css'; 

const props = defineProps({
  locations: {
    type: Array,
    required: true,
    default:[
    {
      type: 'Point',
      coordinates: [-80.185942, 25.774772],
      description: 'Miami, USA'
    },
    {
      type: 'Point',
      coordinates: [-82.185942, 24.774772],
      description: 'Miami-Beach, USA'
    }
    ]
  },
});

const token = 'pk.eyJ1IjoiYW1pbnNhYiIsImEiOiJjbTAzMzRuZjYwMHUxMnFyMjRpMGJxOHphIn0.Du1GjmRsHMhyvlS5Uy7q2Q';
mapboxgl.accessToken = token;

const mapContainer = ref(null);
const map = ref(null);

//  POPUP offset options
  const markerHeight = 50;
  const markerRadius = 10;
  const linearOffset = 25;
  const popupOffsets = {
      'top': [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      'bottom': [0, -markerHeight],
      'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
      'left': [markerRadius, (markerHeight - markerRadius) * -1],
      'right': [-markerRadius, (markerHeight - markerRadius) * -1]
  };

// Initialate the Map on mounted and Mount the map to the ref mapContainer
onMounted(() => {
    // Initialize the map
    map.value = new mapboxgl.Map({
      // Pass the map container html element
      container: mapContainer.value,
      // Pass the style URL from Mapbox Studio
      style: "mapbox://styles/aminsab/cm03wyf3u00el01qo2bt3739y", 
      center: props.locations[0].coordinates,
      zoom: 5,
      attributionControl: false,
      scrollZoom: false,
    });

    // Add the navigation control to the map
    const nav = new mapboxgl.NavigationControl();
    map.value.addControl(nav, 'bottom-left');

    // Create a new bounds
    const bounds = new mapboxgl.LngLatBounds();

    // Loop through the locations and add the marker to the map
    // and extend the bounds
    props.locations.forEach((point, index)=>{
      // Add the marker or Pointer to the map by creating a new div element
      const el_marker = document.createElement('div');  
      new mapboxgl.Marker({
        element: el_marker,
        anchor: 'bottom',
      })

      // Create a new marker with the specified element and anchor
      const marker = new mapboxgl.Marker({
        element: el_marker,
        anchor: 'bottom',
      });
      marker.setLngLat(point.coordinates)
      marker.addClassName('map_marker')
      marker.addTo(map.value);
      
      // Extend the map bounds to include the marker's coordinates
      bounds.extend(props.locations[index].coordinates);
      
      const popup = new mapboxgl.Popup({
        closeOnClick: false,
        focusAfterOpen: false,
        offset: popupOffsets,
      });

      // .setLngLat(props.locations.coordinates)
      popup.setHTML(`<p>day:${point.day}  ${point.description} </p>`)
      popup.setLngLat(point.coordinates);
      popup.setMaxWidth("300px");
      popup.addClassName('popup');
      
      // .addTo(map.value);
      popup.addTo(map.value);
    });

  // bounds.extend(props.locations.coordinates);
  map.value.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    }
  });
});

// Remove the map on unmounted hook
onUnmounted(() => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});
</script>


<template>
  <section
    ref="mapContainer"
    class="map-container"
  >
  </section>
</template>

<style>
.map-container {
  flex: 1;
  box-sizing: border-box !important;
}

/* Map Marker */
.map_marker {
  background-image: url('https://natours-express.onrender.com/img/pin.png');
  background-size: cover;
  width: 32px;
  height: 40px;
  cursor: pointer;
  opacity: 0.4 !important;
}

/* Popup */
.popup {
  font-size: 1.2rem;
  border-radius: 18px;
  color: #252231;
  font-weight: 300;
  text-align: center;
}

.popup button {
  border: 1px solid #25223115;
  border-radius: 2px;
  padding: 1px 3px;
  margin: 2px;
  cursor: pointer;
}
</style>