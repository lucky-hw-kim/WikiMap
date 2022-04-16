// Client facing scripts here
$(()=>{

  // const { getAllPinsFromAllMaps } = require('../../lib/pins-queries');
    /* Start of LeafLetJS */
    // setup map

    // const location = `${latitude}, ${longitude}`;
    let {latitude, longitude} = location

    latitude = 49.273376;
    longitude = -123.103834;
        
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

    L.control.locate().addTo(map);
    
    /* End of LeafLetJS */

    let imageTemplate = `<fieldset><legend>Gallery</legend>
    <img src="http://via.placeholder.com/295x160" title="Science World" alt="Science World" style="width: 100%;">
    </fieldset>`;
    const titleTemplate = `Science World!`;
    const descriptionTemplate = `This is an awesome place to check out science events!`;
    const authorTemplate = `Email of user (Or their ID unless we add a username)`;

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
        <form action="/maps/2/1/pins" method="post">
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

          <input type="submit" id="save-pin-create" value="Save Pin"></input>
        </form>
      `;
 
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

    // const loadPins = () => {

    //   const markerOptions = {
    //     alt: titleTemplate,
    //     title: titleTemplate,
    //     keyboard: true,
    //     draggable: true,
    //     riseOnHover: true,
    //     closeButton: true
    //   }

    //   const popupOptions = {
    //     maxWidth: 560,
    //     minWidth: 350
    //   }
      
    //   const geolocation = `${e.latlng.lat} ${e.latlng.lng}`;
    //   const popupFormat = `
    //     <form action="/maps/1/3/pins" method="post">
    //       <label for="name">Title</label>
    //       <input type="text" id="name" name="name" placeholder="Optional">
    //       <input type="hidden" id="location" name="location" value="${geolocation}">
    //       <label for="description">Description</label>
    //       <textarea type="text" id="description" name="description" rows="2" cols="1" placeholder="Optional"></textarea>

    //       <fieldset>
    //       <legend>Gallery</legend>
    //       <label for="image_url">Select a file:</label>
    //       <input type="file" id="image_url" name="image_url">
    //       </fieldset>

    //       <input type="submit" id="save-pin" value="Save Pin"></input>
    //     </form>
    //   `;
    //   // <input type="button" id="delete-pin" name="delete-pin" value="Delete Pin"></input>
    //   L.marker(e.latlng, markerOptions).addTo(markerGroup)
    //   .bindPopup(popupFormat, popupOptions)
    //   .openPopup();

    // }
    
    const firstLogin = (header,message)=>{
      
      const modalContainer = `
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <div id="modalContainer">
        <main class="modal-content animate__animated animate__jackInTheBox">
          <div class="modal-message">
            <div>
              <h1>${header}</h1>
              <p>${message}</p>
              <div>
              <button id="exploreGuest">Explore as a Guest</button>
              <button id="signUp">Sign Up</button>
              <button id="login">Login</button>
              </div>
            </div>
            <div>
              <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_Tdoufu.json"  background="transparent"  speed="0.5" autoplay></lottie-player>
            </div>
          </div>
        </main>
        
      </div>
      `;
      $("body").append(modalContainer);
    }
   
    const firstTime = localStorage.getItem("first_time");
    if(!firstTime) {
        localStorage.setItem("first_time","1");
        firstLogin('Welcome to our WikiMaps!', `This looks like your first time here, please let us know how you'd like to use WikiMaps.`);
      }

    $('#readyToStart').click(()=>{
      $('#modalContainer').remove()
    })

    /* Explore as a Guest button (First time Login) */
    $('#exploreGuest').click(()=>{

      /* Remove the animateIn class */
      $('#modalContainer > main').removeClass('animate__jackInTheBox');
      
      /* Time the Modal Disapear */
      setInterval(()=>{
        $('#modalContainer > main').addClass('animate__zoomOutDown');
      } ,0)        
      
      /* Time the background fade */
      setInterval(()=>{
        $('#modalContainer').addClass('animate__animated');  
        $('#modalContainer').addClass('animate__fadeOut');
      } ,1000)
      
      /* Destroy the modal */
      setInterval(()=>{
        /* Destroy the Modal*/
        $('#modalContainer').remove();  
      } ,2000)


          
    })
    const onMapClick = (e) => {
 
      console.log("You clicked the map at " + e.target);
       createMarker(e);
   
     }
   
     // Create a pin on map
     $("#create-pins").click(()=>{
       alert("Click on the map to create a pin");
       map.on('click', onMapClick);
     });

    //  $("#create-pins").click(()=>{
    //   e.preventDefault();
    //   // alert("Click on the map to create a pin");
    //   // map.on('click', onMapClick);  
    //   onMapClick(e);
    // });
  
    // // e.preventDefault();
    // const onMapClick = (e) => {

    //   createMarker(e);
    // }
    
    // Create a pin on map
    // $("#create-pins").click(()=>{
    //   e.preventDefault();
    //   // alert("Click on the map to create a pin");
    //   // map.on('click', onMapClick);  
    //   onMapClick(e);
    // });

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
  
      $.get('/maps/json')
      .then(
        (data)=>{
          pinData = data;
          console.log(data)
          
          const addMarkers = ()=>{
            for(let item of data){
              
              const markerOptions = {
                alt: item.name,
                title: item.name,
                keyboard: true,
                draggable: false,
                riseOnHover: true,
                closeButton: true
              }
          
              const popupOptions = {
                maxWidth: 560,
                minWidth: 350
              }
         
              let geolocation = item.location.split(' ');
              const popupFormat = `
              <div id="editPinDetails">
                  <h1>${item.name}</h1>
                  <p>${item.description}</p>
                  <img src="${item.image_url}">
                  <button data-mapid="${item.map_id}" data-geo="${geolocation}" class="editPin" id="editPin${item.id}" >Edit Pin</button> <button id="deletePin">Delete Pin</button>
                  </div>
                  `;
                  
//Edit pin and save

              itemID = '#editPin' + item.id;
      
              const marker = L.marker([geolocation[0], geolocation[1]], markerOptions).addTo(map);

                marker.bindPopup(popupFormat, popupOptions)
                // .openPopup();
            }            
          }
         addMarkers();
        }
      )

    // Save create Pin

    // $("#map").on('click', "#save-pin-create", (e)=>{
    //   console.log("event3", e.target.parentElement);
    //   e.preventDefault();
    //   const pinName = e.target.parentElement.name.value
    //   const pinDesc = e.target.parentElement.description.value
    //   const pinImage = e.target.parentElement.image_url.value
    //   pinImage = fileInput.value.replace("C:\\fakepath\\", "/styles/condensed_image/uploads/resized/");
    //   const pinGeo = e.target.parentElement.dataset.geo
    //   const pinId = e.target.parentElement.id.value
  
    //   const template2 = `
    //   <div id="editPinDetails">
    //   <h1>${pinName}</h1>
    //   <p>${pinDesc}</p>
    //   <img src="${pinImage}">
    //   <button data-mapid="1" data-geo="${pinGeo}" class="editPin" id="editPin${pinId}">Edit Pin</button> <button id="deletePin">Delete Pin</button>
    //   </div>`
     
    //   console.log("event1",e.target);
    //   const newPinId = itemID.replace('#editPin', '');
    //   // console.log("came from savepin!!!", e.target.draggable);
    //   const geo = e.target.dataset.geo
    //   $(e.target.parentElement).empty().append(template2)
    //   $.post(`/maps/3/1/pins/${newPinId}/edit`, {
    //     pinName, pinDesc, pinImage, pinGeo, newPinId
    //     })
    //   })

      
            

    $("#map").on('click', '.editPin', (e)=>{
      console.log("event2", e.target);
      e.preventDefault();
     console.log("came from editPin", e.target.dataset);
      console.log(e.target.parentElement);
      const geo = e.target.dataset.geo
      $(e.target.parentElement).empty()
      .append(createPinEditForm(geo));
    });

    $("#map").on('click', '#save-pin-add', (e)=>{
      console.log("event3", e.target.parentElement);
      e.preventDefault();
      const pinName = e.target.parentElement.name.value
      const pinDesc = e.target.parentElement.description.value
      const pinImage = e.target.parentElement.image_url.value
      pinImage = fileInput.value.replace("C:\\fakepath\\", "/styles/condensed_image/uploads/resized/");
      const pinGeo = e.target.parentElement.dataset.geo
      const pinId = e.target.parentElement.id.value
  
      const template2 = `
      <div id="editPinDetails">
      <h1>${pinName}</h1>
      <p>${pinDesc}</p>
      <img src="${pinImage}">
      <button data-mapid="1" data-geo="${pinGeo}" class="editPin" id="editPin${pinId}">Edit Pin</button> <button id="deletePin">Delete Pin</button>
      </div>`
     
      console.log("event1",e.target);
      const newPinId = itemID.replace('#editPin', '');
      // console.log("came from savepin!!!", e.target.draggable);
      const geo = e.target.dataset.geo
      $(e.target.parentElement).empty().append(template2)
      $.post(`/maps/3/1/pins/${newPinId}/edit`, {
        pinName, pinDesc, pinImage, pinGeo, newPinId
        })
      })
 
 


    // Delete pin button (on popup) should ONLY show if the pin is in database.
    $("#map").on('click', '#deletePin', (e)=>{
      e.preventDefault();
      alert("came from DELETEPIN", e.target.dataset);
      $.post(`/maps/3/1/pins/3/delete`,()=> {
      })
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

    // // Profile button (Footer)
    // $("#saved-map-btn").click(()=>{
    //   window.location.href = "/maps/2/profile";
    // });


    // Close Button
    $(".modal-content span.close").click(()=>{
      loginModal.attr('display', 'none');
    });

     


    // Favorites
    $("#fav-btn").click(()=>{
      $.get(`/2/favorites/`)
      .then((result)=>{
        $.post(`/maps/list/${result.users_id}/${result.maps_id}/favorite-profile`)
      })
      
    });


$('#editMap').click((e)=>{
  e.preventDefault();
  $('body > aside > div:nth-child(8)').load( "/maps/3/3/edit #create-map")
})

$('#create-pins').click((e)=>{
  // window.location.href = "/maps/2/profile";
  $.get('/maps/3/pins').
  then(()=>{
    e.preventDefault();
    $('#map').load( "body > aside")
  })
  createMarker(e)
})

  /* Start of Button onClick Triggers */

  // Login Button
  $("#login-btn").click(()=>{
    window.location.href = "/maps";
    // $("#login-modal").attr('display', 'block');
    // alert('trigger login modal');
  });
  let itemID = '';
  // About Button
  $("#about-btn").click(()=>{

    $("#about-modal").attr('display', 'block');
    alert('trigger about modal');
  });
  let pinData;
  // $(document).ready(()=>{
  $.get('/maps/json')
    .then(
      (data)=>{
        pinData = data;
        console.log(data);
          
        const addMarkers = ()=>{
          for (let item of data) {
              
            const markerOptions = {
              alt: item.name,
              title: item.name,
              keyboard: true,
              draggable: false,
              riseOnHover: true,
              closeButton: true
            };
          
            const popupOptions = {
              maxWidth: 560,
              minWidth: 350
            };
         
            let geolocation = item.location.split(' ');
            const popupFormat = `
              <div id="editPinDetails">
                  <h1>${item.name}</h1>
                  <p>${item.description}</p>
                  <img src="${item.image_url}">
                  <button data-mapid="${item.map_id}" data-geo="${geolocation}" class="editPin" id="editPin${item.id}" >Edit Pin</button> <button type="button" class="deletePin" id="deletePin">Delete Pin</button>
                  </div>
                  `;

                  
            itemID = '#editPin' + item.id;
      
            const marker = L.marker([geolocation[0], geolocation[1]], markerOptions).addTo(map);

            marker.bindPopup(popupFormat, popupOptions)
              // .openPopup();
            const editPinForm = ` 
              <form action="/maps/2/1/pins" method="post">
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
            </form>`;
            // setTimeout(()=>{
            //   $('.editPin').on('click',(e)=>{
            //     // e.preventDefault();
            //     console.log("EditPinHERE!");
            //     console.log($('#editFormDetails').html());
            //   })
            // },1000)

            // Save pin button (on popup)
          }
        };
        addMarkers();
      }
    );

  // });
  // const editPinForm = `
  //           <form action="/maps/2/6/pins" method="post">
  //           <label for="name">Title</label>
  //           <input type="text" id="name" name="name" placeholder="Optional">
  //           <input type="hidden" id="location" name="location" value="">
  //           <label for="description">Description</label>
  //           <textarea type="text" id="description" name="description" rows="2" cols="1" placeholder="Optional"></textarea>
    
  //           <fieldset>
  //           <legend>Gallery</legend>
  //           <label for="image_url">Select a file:</label>
  //           <input type="file" id="image_url" name="image_url">
  //           </fieldset>
    
  //           <input type="submit" id="save-pin" value="Save Pin"></input>
  //         </form>`
      
  const createPinEditForm = (geo) => {
    const form = $(` 
              <form>
              <label for="name">Title</label>
              <input type="text" id="name" name="name" placeholder="Optional">
              <input type="hidden" id="location" name="location" value="${geo}">
              <label for="description">Description</label>
              <textarea type="text" id="description" name="description" rows="2" cols="1" placeholder="Optional"></textarea>
    
              <fieldset>
              <legend>Gallery</legend>
              <label for="image_url">Select a file:</label>
              <input type="file" id="image_url" name="image_url">
              </fieldset>
              <input type="submit" id="save-pin" value="Save Pin"></input>
            </form>`);
    form.on('submit',(e) => {
      e.preventDefault();
      const pinName = e.target.name.value;
      const pinDesc = e.target.description.value;
      const pinImage = e.target.image_url.value;
      const pinGeo = e.target.dataset.geo;
      const pinId = e.target.id.value;
      console.log("event1",e.target);
      const newPinId = itemID.replace('#editPin', '');

      // let map_id = e.target.dataset.mapid;

      $.post(`/maps/3/1/pins/${newPinId}/edit`, {
        pinName, pinDesc, pinImage, pinGeo, newPinId
      });
    });
    return form;
  };

  $("#map").on('click', '.editPin', (e)=>{
    console.log("event2", e.target);
    e.preventDefault();
    console.log("came from editPin", e.target.dataset);
    console.log(e.target.parentElement);
    const geo = e.target.dataset.geo;
    $(e.target.parentElement).empty()
      .append(createPinEditForm(geo));
  });


  // Delete pin button (on popup) should ONLY show if the pin is in database.
  $("#map").on('click', '#delete-pin', ()=>{
    e.preventDefault();
    console.log("came from editPin", e.target.dataset);
    $.post(`/3/1/pins/3/delete`,()=> {
    });
    markerGroup.removeLayer(2);
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

  // Profile button (Footer)
  $("#saved-map-btn").click(()=>{
    window.location.href = "maps/2/profile";
  });


  // Close Button
  $(".modal-content span.close").click(()=>{
    loginModal.attr('display', 'none');
  });

  // Favorites
  $("#fav-btn").click(()=>{
    $.get(`/2/favorites/`)
      .then((result)=>{
        $.post(`/maps/list/${result.users_id}/${result.maps_id}/favorite-profile`);
      });
      
  });


  $('#editMap').click((e)=>{
    e.preventDefault();
    $('body > aside > div:nth-child(8)').load("/maps/3/3/edit #create-map");
  });


  // $('#editBtn').click((e)=>{
  //   e.preventDefault();
  //   $('body > aside > div:nth-child(8)').load( "/maps/3/3/edit #create-map")
  // })


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




      