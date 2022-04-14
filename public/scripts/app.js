// Client facing scripts here
$(()=>{

    /* Start of LeafLetJS */
    // setup map

    // const location = `${latitude}, ${longitude}`;
    let {latitude, longitude} = location

    latitude = 49.273376;
    longitude = -123.103834;

    // function getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition);
    //   } else {
    //     alert("Geolocation is not supported by this browser.");
    //   }
    // }

    // function showPosition(position) {
    //   latitude = position.coords.latitude;
    //   longitude = position.coords.longitude;
    // }

    // getLocation();
    
    const zoomLevel = 13;
    const map = L.map('map').setView([latitude, longitude], zoomLevel);

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
    const titleTemplate = `Science World!`;
    const descriptionTemplate = `This is an awesome place to check out science events!`;
    const authorTemplate = `Email of user (Or their ID unless we add a username)`;

    /* Science World Test Marker SEED DATA */
    L.marker([latitude, longitude])
      .addTo(map)
        .bindPopup(`<h1>${titleTemplate}</h1>${descriptionTemplate}${imageTemplate}<br><br>${authorTemplate}`); // (May need to sanitize this input)


    // tracks the markers for adjustment if needed.
    let markerGroup = L.layerGroup().addTo(map);

    /**
     * Allows the user to create a marker on the map.
     * ### Includes:
     * * Alt, and Title tags for accesability
     * * keyboard control
     * * riseOnHover to reduce cluttered pins
     * @param {EventHandler} e 
     */
    const createMarker = (e)=>{
     
      const markerOptions = {
        alt: titleTemplate,
        title: titleTemplate,
        keyboard: true,
        draggable: true,
        riseOnHover: true,
        closeButton: true
      }

      const popupOptions = {
        maxWidth: 560,
        minWidth: 350
      }
      
      const geolocation = `${e.latlng.lat} ${e.latlng.lng}`;
      const popupFormat = `
        <form action="/maps/6/2/pins" method="post">
          <label for="name">Title</label>
          <input type="text" id="name" name="name" placeholder="Optional">
          <input type="hidden" id="location" name="location" value="${geolocation}">
          <label for="description">Description</label>
          <textarea type="text" id="description" name="description" rows="2" cols="1" placeholder="Optional"></textarea>

          <fieldset>
          <legend>Gallery</legend>
          <label for="image_url">Select a file:</label>
          <input type="file" id="image_url" name="image_url">
          </fieldset>

          <input type="submit" id="save-pin" value="Save Pin"></input>
        </form>
      `;
      // <input type="button" id="delete-pin" name="delete-pin" value="Delete Pin"></input>
      L.marker(e.latlng, markerOptions).addTo(markerGroup)
      .bindPopup(popupFormat, popupOptions)
      .openPopup();

      /* - create element
        - modify the element with given id OR

         - REMOVE DELETE UNTIL SAVED
        - receive as an array, itterate through array
        - JQUERY check if page isload THEN run through array
      */
      
    }

    const loadPins = () => {

      const markerOptions = {
        alt: titleTemplate,
        title: titleTemplate,
        keyboard: true,
        draggable: true,
        riseOnHover: true,
        closeButton: true
      }

      const popupOptions = {
        maxWidth: 560,
        minWidth: 350
      }
      
      const geolocation = `${e.latlng.lat} ${e.latlng.lng}`;
      const popupFormat = `
        <form action="/maps/6/2/pins" method="post">
          <label for="name">Title</label>
          <input type="text" id="name" name="name" placeholder="Optional">
          <input type="hidden" id="location" name="location" value="${geolocation}">
          <label for="description">Description</label>
          <textarea type="text" id="description" name="description" rows="2" cols="1" placeholder="Optional"></textarea>

          <fieldset>
          <legend>Gallery</legend>
          <label for="image_url">Select a file:</label>
          <input type="file" id="image_url" name="image_url">
          </fieldset>

          <input type="submit" id="save-pin" value="Save Pin"></input>
        </form>
      `;
      // <input type="button" id="delete-pin" name="delete-pin" value="Delete Pin"></input>
      L.marker(e.latlng, markerOptions).addTo(markerGroup)
      .bindPopup(popupFormat, popupOptions)
      .openPopup();

    }
    
    const modalTest = ()=>{
      const modalContainer = `
      <div id="modalContainer">
        <section>
          <header>Header</header>
          <p>Modal information</p>
        </section>
      </div>
      `;
      $("body").append(modalContainer);
    }

    $("#modalTest").click(()=>{
      alert("modal triggered")
      modalTest();
    });

    // e.preventDefault();
    const onMapClick = (e) => {
      createMarker(e);
      
      // alert("You clicked the map at " + e.latlng);

      // L.marker(e.latlng).addTo(map)
      // .bindPopup(`Longitude & Latitude: ${e.latlng}`)
      // .openPopup();
    }
    
    // Create a pin on map
    $("#create-pin").click(()=>{
      alert("Click on the map to create a pin");
      map.on('click', onMapClick);    
    });

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

    $("#refresh-btn").click(()=>{
      alert('trigger about modal');
      pinsQueries.getAllPinsFromAllMaps();
      console.log(pinsQueries.getAllPinsFromAllMaps())
    });

    // Save pin button (on popup)
    $("#save-pin").click(()=>{
      // e.preventDefault();
      
    });

    // Delete pin button (on popup) should ONLY show if the pin is in database.
    $("#map").on('click', '#delete-pin', ()=>{

      markerGroup.removeLayer(2)

    });

    // create a map button (Footer)
    $("#create-map-btn").click(()=>{
      window.location.href = "/maps/2/create";
    });

    // edit a map button (Footer)
    $("#edit-map-btn").click(()=>{
      window.location.href = "/maps/2/edit";
    });

    // add a pin button (Footer)
    $("#add-pin-map-btn").click(()=>{
      window.location.href = "/map/1/add";
    });

    // view a map button (Footer)
    $("#view-map-btn").click(()=>{
      window.location.href = "/maps/list";
    });

    // create a map button (Footer)
    // $("#favorite-map-btn").click(()=>{
    //   window.location.href = "/maps/2/favorites";
    // });

    // Profile button (Footer)
    $("#saved-map-btn").click(()=>{
      window.location.href = "maps/2/profile";
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