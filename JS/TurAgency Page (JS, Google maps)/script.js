

window.onload = function () {
		
		
		
    var $ = function (id) {
          return document.getElementById(id)
       }


    var button = document.querySelectorAll ('input[type=button]')
    for (var i = 0; i < button.length; i++) {
        button[i].dataset.flag = true;
        button[i].addEventListener('click', (function(index) {
          return function() {
            var pos = $('address' + (index + 1));
            var maps = $('map' + (index + 1));
            var hotel = $("hotel" + (index + 1));
            showPosition(pos, maps, hotel, this);
          };
        })(i));
      }
    

function showPosition(pos, maps, hotel, btn) {

       if (btn.dataset.flag == "true"){
       var address = pos.textContent;
       if (address) {
               // используем API Google Maps для геокодирования адреса
               // настраиваем объект Geocoder
               var geocoder = new google.maps.Geocoder();

               // возвращаем координаты с помощью функции geocode
               geocoder.geocode({ 'address': address }, function (results, status) {
                   if (status == google.maps.GeocoderStatus.OK) {

                       if (results[0]) {
                          
                              var lat = results[0].geometry.location.lat();
                               var long = results[0].geometry.location.lng();
                               var position = new google.maps.LatLng(lat, long);
   
           
           // параметры для карты.
               var options = {
                   zoom: 15,
                   center: position, // позиция расположения на карте
                   mapTypeId: google.maps.MapTypeId.ROADMAP // тип карты - ROADMAP, SATELLITE, HYBRID and TERRAIN
                               };
           
           // объект карты.
           var map = new google.maps.Map(maps,options);
           // маркер
           var marker = new google.maps.Marker({
           position: position,
           map: map,
           
       });
                   var infowindow = new google.maps.InfoWindow({
           content: "This hotel"
       });
    // присвоение обработчика на нажатие по маркеру.
       google.maps.event.addListener(marker, 'click', function () {
           infowindow.open(map, marker);
       });
       //делаем блок с картой видимым
           maps.style.visibility = "visible";
           maps.style.display = "block";
           maps.style.height = "200px";
           maps.style.width = "100%";

                       }
                       
                       
                        else {
                           error('Google не возвратил результатов.');
                       }

                   } else {
                       error("Геокодирование завершилось ошибкой - " + status);
                   }
               });
               // меняем значение кнопки и флага
               btn.value = "Скрыть карту";
              btn.dataset.flag = "false"
           }	
           
           }

           else  {
               var map = "";
               maps.style.visibility = "hidden";
               maps.style.display = "none";
               btn.value = "Посмотреть местоположение на карте";
               btn.dataset.flag = "true"
           }
           
           }

       
           
           }

       


