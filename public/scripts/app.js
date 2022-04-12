// Client facing scripts here
$(()=>{
    
    /* Start of LeafLetJS */
    // setup map

    // const location = `${latitude}, ${longitude}`;
    let {latitude, longitude} = location
    
    latitude = 49.2222919;
    longitude = -122.6141347;

    /*
    function showPosition(position) {
      x.innerHTML = position.coords.latitude + 
      "," + position.coords.longitude;
    }

    console.log('database test', navigator.geolocation.getCurrentPosition(showPosition()))
Array.push(`${latitude}, ${longitude}`)
    */
   
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

    /* Start of Modal */
    
    const loginModal = $("#login-modal");
    const aboutModal = $("#about-modal");

    // Login Button
    $("#login-btn").click(()=>{
      loginModal.attr('display', 'block');
      alert('trigger login modal');
    });
   
    // About Button
    $("#about-btn").click(()=>{
      aboutModal.attr('display', 'block');
      alert('trigger about modal');
    });
  
    // Close Button
    $(".modal-content span.close").click(()=>{
      loginModal.attr('display', 'none');
    });

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