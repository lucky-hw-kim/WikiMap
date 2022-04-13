// Client facing scripts here
$(()=>{
    
    /* Start of LeafLetJS */
    // setup map

    // const location = `${latitude}, ${longitude}`;
    let {latitude, longitude} = location
    
    latitude = 49.2222919;
    longitude = -122.6141347;

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    }

    getLocation();
    
    const zoomLevel = 13;
    const map = L.map('map');
    map.setView([latitude, longitude], zoomLevel);
  
    /*note look into how to Preconnect to required origins for api.mapbox to improve performance */
    
    // setup tiles
    const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(map);

    /* End of LeafLetJS */

    /* Start of Modal */
    
    /* Start of Button onClick Triggers */
    // Login Button
    $("#login-btn").click(()=>{
      window.location.href = "/maps";
      // $("#login-modal").attr('display', 'block');
      // alert('trigger login modal');
    });
   
    // About Button
    $("#about-btn").click(()=>{

      $("#about-modal").attr('display', 'block');
      alert('trigger about modal');
    });


    // create a map button (Footer)
    $("#create-map-btn").click(()=>{
      window.location.href = "/maps/2/create";
    });

    // create a map button (Footer)
    $("#edit-map-btn").click(()=>{
      window.location.href = "/maps/2/edit";
    });

    // create a map button (Footer)
    $("#view-map-btn").click(()=>{
      window.location.href = "/maps";
    });
    // create a map button (Footer)
    $("#favorite-map-btn").click(()=>{
      window.location.href = "/maps/2/favorites";
    });
    // create a map button (Footer)
    $("#saved-map-btn").click(()=>{
      window.location.href = "maps/2/saved";
    });
  
  
    // Close Button
    $(".modal-content span.close").click(()=>{
      loginModal.attr('display', 'none');
    });

    /* End of Button onClick Triggers */

    // Get the <span> element that closes the modal
    const closeIcon = document.getElementsByClassName("close")[0];

    // // When the user clicks on the button, open the modal
    // loginBtn.onclick = function() {
    //   modal.style.display = "block";
    // }

    // // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //   modal.style.display = "none";
    // }




});