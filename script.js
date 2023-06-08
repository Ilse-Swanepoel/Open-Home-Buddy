// Initialize the map
function initMap() {
  // Set the center of the map
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 37.7749, lng: -122.4194 } // Default to San Francisco
  });
}

// Calculate and display the route
function calculateRoute() {
  // Get the origin and destination addresses from the input fields
  var origin = document.getElementById('origin').value;
  var destination = document.getElementById('destination').value;

  // Create a directions service object
  var directionsService = new google.maps.DirectionsService();

  // Create a directions renderer object to display the route on the map
  var directionsRenderer = new google.maps.DirectionsRenderer();

  // Attach the renderer to the map
  directionsRenderer.setMap(map);

  // Create a request object for the directions service
  var request = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING // You can change this to other travel modes like WALKING, BICYCLING, or TRANSIT
  };

  // Call the directions service to calculate the route
  directionsService.route(request, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      // Display the route on the map
      directionsRenderer.setDirections(response);

      // Display the estimated travel time
      var route = response.routes[0];
      var duration = 0;
      for (var i = 0; i < route.legs.length; i++) {
        duration += route.legs[i].duration.value;
      }
      var hours = Math.floor(duration / 3600);
      var minutes = Math.floor((duration % 3600) / 60);
      var time = hours + " hours " + minutes + " minutes";
      alert("Estimated travel time: " + time);
    } else {
      // Handle the error
      alert("Directions request failed. Error status: " + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initMap);