

const drawSimpleMap = () => {
    return `
        <h1>A Simple Google Map</h1>

        <div id="map" style="width:600px; height: 400px;"></div>

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIJ9XX2ZvRKCJcFRrl-lRanEtFUow4piM"></script>

        <script>
            var map_parameters = {center: {lat: 47.490, lng: -117.585}, zoom: 8 };
            var map = new google.maps.Map(document.getElementById('map'), map_parameters);
        </script>
    `
}

const drawTestMap = () => {

    document.querySelector(".map_section").innerHTML = drawSimpleMap()

}


drawTestMap()
