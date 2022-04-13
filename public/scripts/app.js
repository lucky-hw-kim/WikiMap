// Client facing scripts here
$(()=>{

    /* Start of LeafLetJS */
    // setup map

    // const location = `${latitude}, ${longitude}`;
    let {latitude, longitude} = location

    latitude = 49.273376;
    longitude = -123.103834;

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
    const map = L.map('map').setView([latitude, longitude], zoomLevel);

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

    let imageTemplate = `<fieldset><legend>Gallery</legend>
    <img src="http://via.placeholder.com/295x160" title="Science World" alt="Science World" style="width: 100%;">
    </fieldset>`;
    let titleTemplate = `<h1>Science World!</h1>`;
    let descriptionTemplate = `This is an awesome place to check out science events!`;
    let authorTemplate = `Email of user (Or their ID unless we add a username)`;

    /* Science World Test Marker */
    L.marker([latitude, longitude])
      .addTo(map)
        .bindPopup(`${titleTemplate}${descriptionTemplate}${imageTemplate}<br><br>${authorTemplate}`); // (May need to sanitize this input)


    const onMapClick = (e) => {
      alert("You clicked the map at " + e.latlng);

      L.marker(e.latlng).addTo(map)
      .bindPopup(`Longitude & Latitude: ${e.latlng}`)
      .openPopup();

    }


    // Create a pin on map
    $("#create-pin").click(()=>{

      alert("Click on the map to create a pin");

      map.on('click', onMapClick);

      // L.marker([0, 0]).addTo(map)
      // .bindPopup('<h1>Science World!</h1> This is an awesome place to check out science events!')
      // .openPopup();

    });


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
    $("#add-pin-map-btn").click(()=>{
      window.location.href = "/map/1/add";
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
