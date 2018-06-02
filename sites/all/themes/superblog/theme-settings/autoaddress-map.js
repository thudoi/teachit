var geocoder;
var map;
var markers;
var infowindow;
var icon_map ;


function initMap(){
    superlog = Drupal.settings.superblog;
    if(superlog.superblog_latitude_map !== undefined && superlog.superblog_longitude_map !== undefined) {
        $text_info = superlog.infowindow.value;
        infowindow = new google.maps.InfoWindow();
        $lat_map = parseFloat(superlog.superblog_latitude_map);
        $lng_map = parseFloat(superlog.superblog_longitude_map);
        map = new google.maps.Map(document.getElementById('address_map_contact'), {
            scrollwheel: false,
            navigationControl: true,
            mapTypeControl: false,
            scaleControl: false,
            center: new google.maps.LatLng($lat_map,$lng_map),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 16,
        });
        icon_map = {
            url: superlog.marker.uri,
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0, 0)
        };
        var marker = new google.maps.Marker({
            position: {lat:$lat_map,lng: $lng_map},
            map: map,
            icon:icon_map,
            animation: google.maps.Animation.DROP,
        });
        google.maps.event.addListener(marker, 'click', (function() {
                if (marker.getAnimation() != null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                infowindow.setContent($text_info);
                infowindow.open(map, marker);
        }));
    }
}

function initAutocomplete() {
    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-33.8902, 151.1759),
        new google.maps.LatLng(-33.8474, 151.2631));

    var input = document.getElementById('map_auto_contact');
    var options = {
        bounds: defaultBounds,
        types: ['address']
    };
    autocomplete = new google.maps.places.Autocomplete(input, options);
}

codeAddress = function() {
    geocoder = new google.maps.Geocoder();

    var address = document.getElementById('map_auto_contact').value;
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map = new google.maps.Map(document.getElementById('address_map_contact'), {
                zoom: 16,
                streetViewControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP]
                },
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                draggable: true,
                title: 'My Title'
            });

            updateMarkerPosition(results[0].geometry.location);
            geocodePosition(results[0].geometry.location);

            // Add dragging event listeners.
            google.maps.event.addListener(marker, 'dragstart', function() {
                updateMarkerAddress('Dragging...');
            });

            google.maps.event.addListener(marker, 'drag', function() {
                updateMarkerStatus('Dragging...');
                updateMarkerPosition(marker.getPosition());
            });

            google.maps.event.addListener(marker, 'dragend', function() {
                updateMarkerStatus('Drag ended');
                geocodePosition(marker.getPosition());
                map.panTo(marker.getPosition());
            });

            google.maps.event.addListener(map, 'click', function(e) {
                updateMarkerPosition(e.latLng);
                geocodePosition(marker.getPosition());
                marker.setPosition(e.latLng);
                map.panTo(marker.getPosition());
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });


}

function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

function updateMarkerStatus(str) {
    document.getElementById('markerStatus').innerHTML = str;
}

function updateMarkerPosition(latLng) {
    jQuery('#latitude_map').val(latLng.lat());
    jQuery('#longitude_map').val(latLng.lng());
    document.getElementById('info').innerHTML = [
        latLng.lat(),
        latLng.lng()
    ].join(', ');
}

function updateMarkerAddress(str) {
    jQuery('#map_auto_contact').val(str);
}

(function($){
    $(document).ready(function(){
        var map = document.getElementById('address_map_contact');
        initMap();
        initAutocomplete();
        $('.vertical-tab-button > a').bind('click', function() {
            google.maps.event.trigger(map, 'resize');
        });

    })
}(jQuery))