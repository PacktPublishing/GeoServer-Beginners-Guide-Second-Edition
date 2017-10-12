function initMap() {
  
    var maptypeOptions = {
        getTileUrl: function(coord, zoom)
        {
            
            var s = Math.pow(2, zoom);  
            var twidth = 256;
            var theight = 256;
     
            var gBl = map.getProjection().fromPointToLatLng( new google.maps.Point(coord.x * twidth / s, (coord.y + 1) * theight / s));
            var gTr = map.getProjection().fromPointToLatLng( new google.maps.Point((coord.x + 1) * twidth / s, coord.y * theight / s));
     
            var bbox = gBl.lng() + "," + gBl.lat() + "," + gTr.lng() + "," + gTr.lat();
            
            var url = "http://localhost:8080/geoserver/Packt/wms?";
     
            url += "&service=WMS";
            url += "&version=1.1.0";
            url += "&request=GetMap";
            url += "&layers=NaturalEarthCountries";
            url += "&styles=";
            url += "&format=image/png";
            url += "&TRANSPARENT=TRUE";
            url += "&srs=EPSG:4326";
            url += "&bgcolor=0xFFFFFF",
            url += "&bbox=" + bbox;
            url += "&width=256";
            url += "&height=256";

            return url;

        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        maxZoom: 15,
        minZoom: 1,
        alt: ''
    };
  
    var custommap = new google.maps.ImageMapType(maptypeOptions);
  
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(45.5,10.5),
        mapTypeControl:false,
        mapTypeId:'mapid',
        backgroundColor: "#badbff"
    }
  
    map = new google.maps.Map(document.getElementById("map"),mapOptions);
    map.mapTypes.set('mapid', custommap);

    var placesLayer =
     new google.maps.ImageMapType(
     {
       getTileUrl:
        function (coord, zoom) {
 
        var s = Math.pow(2, zoom);  
        var twidth = 256;
        var theight = 256;
 
        var gBl = map.getProjection().fromPointToLatLng( new google.maps.Point(coord.x * twidth / s, (coord.y + 1) * theight / s));
        var gTr = map.getProjection().fromPointToLatLng( new google.maps.Point((coord.x + 1) * twidth / s, coord.y * theight / s));
 
        var bbox = gBl.lng() + "," + gBl.lat() + "," + gTr.lng() + "," + gTr.lat();
 
        var url = "http://localhost:8080/geoserver/Packt/wms?";
 
        url += "&service=WMS";
        url += "&version=1.1.0";
        url += "&request=GetMap";
        url += "&layers=ne_50m_populated_places";
        url += "&styles=PopulatedPlacesComplex";
        url += "&format=image/png";
        url += "&TRANSPARENT=TRUE";
        url += "&srs=EPSG:4326";
        url += "&bbox=" + bbox;
        url += "&width=256";
        url += "&height=256";
 
        return url;
      },
 
      tileSize: new google.maps.Size(256, 256),
      isPng: true
     });
 
    map.overlayMapTypes.push(placesLayer);
    
    
}
