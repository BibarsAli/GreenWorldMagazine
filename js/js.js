
//**************sidebar noticias***************/
    // Obtener todos los botones
    var botones = document.querySelectorAll('.boton');

// Función para cambiar la clase 'active' al botón pulsado
function cambiarActivo(boton) {
    // Remover la clase 'active' de todos los botones
    botones.forEach(function(boton) {
        boton.classList.remove('active');
    });
    // Agregar la clase 'active' al botón pulsado
    boton.classList.add('active');
}

// Asignar evento clic a cada botón para llamar a la función cambiarActivo
botones.forEach(function(boton) {
    boton.addEventListener('click', function() {
        cambiarActivo(boton);
    });
});

//**************json noticias***************/
function mostrarNoticias(categoria) {
   // Realiza la solicitud AJAX para obtener el JSON desde el archivo noticias.json
   $.getJSON('./js/noticias.json', function (data) {
      var noticias = data[categoria];

      // Limpiar el contenedor de noticias antes de agregar nuevas noticias
      $('#contenedorNoticias').empty();

      // Iterar sobre las noticias y agregarlas al contenedor
      for (var i = 0; i < noticias.length; i++) {
         var noticia = noticias[i];

         // Crear elementos HTML para mostrar la noticia
         var card = $('<div class="card">');
         var cardBody = $('<div class="card-body">');
         var titulo = $('<h3 class="card-title">').text(noticia.title);
         var imagen = $('<img src="' + noticia.urlToImage + '" class="card-img-top">');
         var descripcion = $('<div class="card-text">').text(noticia.description);

         // Crear un párrafo oculto para el contenido
         // var contenido = $('<div class="card-text contenido-expandido" style="display: none;">').text(noticia.content);
         var nota = $('<p class="card-nota">').text(noticia.author + " " + noticia.publishedAt);

         // Crear un nuevo div contenedor
         var contenedor = $('<div class="contenedor">' );  
         var contenedor1 = $('<div class="contenedor1">' ); 
         var contenedor2 = $('<div class="contenedor2">');
         var link = $('<a href="' + noticia.url + '" target="_blank" class="card-url">').text('Ver noticia');

         // Crear el botón y agregar la funcionalidad de cambio de visibilidad
         // var boton = $('<button class="card-button">').text('Leer más').click((function (contenido) {
         //    return function () {
         //       contenido.slideToggle();
         //       $(this).text(function (i, text) {
         //          return text === "Leer más" ? "Leer menos" : "Leer más";
         //       });
         //    };
         // })(contenido));

         // Agregar los elementos al contenedor de noticias
         card.append(cardBody);
         cardBody.append(contenedor);
         contenedor.append(titulo);
         cardBody.append(contenedor1);
         contenedor1.append(imagen);
         contenedor1.append(descripcion);
         // contenedor1.append(contenido);
         
         cardBody.append(contenedor2);
         contenedor2.append(nota);
         contenedor2.append(link);
         // contenedor2.append(boton);

         $('#card-text').append(contenedor1);
         $('#card-boton').append(contenedor2);
         // Agregar la tarjeta al contenedor de noticias con un efecto de desplazamiento
         card.hide().appendTo('#contenedorNoticias').fadeIn('slow');
      }


   });
}

// Llamada inicial para mostrar las noticias de 'destinos'
mostrarNoticias('destinos');

//**************galeria.html***************/
//**************Slider galeria***************/
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function () {
   let items = document.querySelectorAll('.slider-items')
   document.querySelector('.slider').appendChild(items[0])
})

prev.addEventListener('click', function () {
   let items = document.querySelectorAll('.slider-items')
   document.querySelector('.slider').prepend(items[items.length - 1])
})

//**************section galeria***************/

$('.portfolio-item').isotope({
   itemSelector: '.item',
   layoutMode: 'fitRows'
});
$('.portfolio-menu ul li').click(function () {
   $('.portfolio-menu ul li').removeClass('active');
   $(this).addClass('active');

   var selector = $(this).attr('data-filter');
   $('.portfolio-item').isotope({
      filter: selector
   });
   return false;
});
$(document).ready(function () {
   var popup_btn = $('.popup-btn');
   popup_btn.magnificPopup({
      type: 'image',
      gallery: {
         enabled: true
      }
   });
});
//**************presupuesto.html***************/
//**************section presupuesto***************/

function reservar(btn) {
   var precio = parseInt(btn.getAttribute("data-precio"));
   document.getElementById("evento").value = btn.value; // Asigna el valor del evento seleccionado
   document.querySelectorAll('input[name="extras"]').forEach(function (extra) {
      extra.checked = false; // Reinicia los extras seleccionados
   });
   calcularPresupuesto(); // Llama a la función calcularPresupuesto
}

function calcularPresupuesto() {
   var evento = document.getElementById("evento").value; // Obtiene el valor del evento seleccionado
   var numPersonas = parseInt(document.getElementById("numPersonas").value); // Obtiene el número de personas
   var extras = document.querySelectorAll('input[name="extras"]:checked');

   // Calcula el presupuesto base según el evento elegido y el número de personas
   var precioBase = parseInt(document.querySelector('option[value="' + evento + '"]').textContent.match(/\d+/)[0]) * numPersonas;

   // Aplica descuento según el plazo o si hay 3 personas o más
   var descuento = 0;
   if (numPersonas >= 3) {
      descuento = 0.1; // 10% de descuento si hay 3 o más personas
   }

   var precioFinal = precioBase * (1 - descuento);


   // Añade el costo de los extras seleccionados
   extras.forEach(function (extra) {

      precioFinal += parseInt(extra.value);
   });

   // Muestra el presupuesto final
   document.getElementById("presupuestoFinal").innerText = "Precio final: € " + precioFinal.toFixed(2);
}


function validarContacto() {
   var nombre = document.getElementById("nombre").value;
   var apellidos = document.getElementById("apellidos").value;
   var telefono = document.getElementById("telefono").value;
   var email = document.getElementById("correo").value;

   var regexNombre = /^[a-zA-Z]{1,15}$/;
   var regexApellidos = /^[a-zA-Z\s]{1,40}$/;
   var regexTelefono = /^[0-9]{1,9}$/;
   var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   if (!regexNombre.test(nombre)) {
      alert("El nombre solo puede contener letras y tener hasta 15 caracteres.");
      return false;
   }
   if (!regexApellidos.test(apellidos)) {
      alert("Los apellidos solo pueden contener letras y tener hasta 40 caracteres.");
      return false;
   }
   if (!regexTelefono.test(telefono)) {
      alert("El teléfono solo puede contener números y tener hasta 9 dígitos.");
      return false;
   }
   if (!regexEmail.test(email)) {
      alert("Ingrese un correo electrónico válido.");
      return false;
   }

   // Calcula el presupuesto antes de enviar el formulario
   calcularPresupuesto();

   return true;
}

//**************contacto.html***************/
//**************login section***************/
var regTab = document.querySelector('.login-group .login-list:first-child');
var loginTab = document.querySelector('.login-group .login-list:last-child');
var regContent = document.getElementById('reg');
var loginContent = document.getElementById('login');

function switchTab(tab) {
   if (tab.classList.contains('active')) return;

   regTab.classList.toggle('active');
   loginTab.classList.toggle('active');

   regContent.style.display = regTab.classList.contains('active') ? 'block' : 'none';
   loginContent.style.display = loginTab.classList.contains('active') ? 'block' : 'none';
}

regTab.addEventListener('click', function (event) {
   event.preventDefault();
   switchTab(regTab);
});

loginTab.addEventListener('click', function (event) {
   event.preventDefault();
   switchTab(loginTab);
});

//**************section mapa dynamica***************/

var marker;

function initMap() {
   var empresa = { lat: 39.86247, lng: -4.02528 };
   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: empresa,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
         position: google.maps.ControlPosition.TOP_RIGHT
      }
   });

   marker = new google.maps.Marker({ // Asignar el marcador a la variable marker
      position: empresa,
      map: map,
      title: 'GreenWorld'
   });

   var autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('origen'),
      { types: ['geocode'] }
   );

   var directionsService = new google.maps.DirectionsService;
   var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      panel: document.getElementById('directionsPanel') // Asignar el panel de direcciones
   });

   var onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
   };
   document.getElementById('ruta').addEventListener('click', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
   directionsService.route({
      origin: document.getElementById('origen').value,
      destination: { lat: 39.86247, lng: -4.02528 },
      travelMode: 'DRIVING'
   }, function (response, status) {
      if (status === 'OK') {
         directionsDisplay.setDirections(response);
         document.getElementById('directionsPanel').style.display = 'block'; // Mostrar el panel de direcciones
         // Extraer información de la ruta
         var route = response.routes[0];
         var routeLeg = route.legs[0];
         var distance = routeLeg.distance.text;
         var duration = routeLeg.duration.text;
         // Crear y mostrar InfoWindow
         var infoWindow = new google.maps.InfoWindow({
            content: '<div><strong>Distancia:</strong> ' + distance + '<br><strong>Duración:</strong> ' + duration + '</div>'
         });
         infoWindow.open(map, marker); // Abre el InfoWindow con el marcador correcto
      } else {
         window.alert('No se pudo calcular la ruta: ' + status);
      }
   });
}

function cerrarPanel() {
   document.getElementById('directionsPanel').style.display = 'none';
}




