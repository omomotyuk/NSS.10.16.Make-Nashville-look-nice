import React, { Component } from 'react';
import L from 'leaflet';
import Token from '../../Token.js'
// marker loading problem: https://github.com/Leaflet/Leaflet/issues/4968
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

//
const dummyDataPath = [
  [36.134842046153565, -86.75954818725587],
  [36.1339408866672, -86.75899028778078],
  [36.13009351246281, -86.75499916076662],
  [36.12957358256369, -86.75461292266846]
];

export default class Leaflet extends Component {
  map = null;

  componentDidMount() {
    // create map
    //this.map = L.map('map').setView([36, -86.5], 10);
    this.map = L.map('map').setView([35.84943466666667, -86.35993719444444], 16);

    //
    //console.log("Map size: ", this.map.getSize())
    //this.map.invalidateSize()

    // add basemap
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      //accessToken: 'YOUR MAPBOX API KEY'
      accessToken: Token
    }).addTo(this.map);

    /*navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      //console.log("current location:", coords)
      //this.map.setView([coords.latitude, coords.longitude], 16);
      //this.map.setView([35.8474785, -86.367514583333], 16);
      this.map.setView([35.84943466666667, -86.35993719444444], 16);
      //35.8474785, longitude: -86.36751458333333
      L.marker([coords.latitude, coords.longitude])
        //L.marker([35.8474785, -86.367514583333])
        .bindPopup('This is your current <strong>location</strong>')
        .addTo(this.map);
    });*/

    // random location mark
    //L.marker([35.89336119702232, -86.33231166335291]).addTo(this.map)
    // NSS location: latitude: 36.1277459, longitude: -86.72562409999999
    // Murfreesboro: 35°50′46″N 86°23′31″W
    //L.marker(["35°50′46″N", "86°23′31″W"]).addTo(this.map)
    //console.log("didMount - locations", this.props.locations)

    let returnedStorage = localStorage.getItem('locations')
    let locations = JSON.parse(returnedStorage)
    //console.log("localStorage - locations", locations)

    //this.props.locations.map(location => {
    locations.map(location => {
      return (L.marker([location.latitude, location.longitude]).bindPopup("User ID:" + location.username + " " + location.date).addTo(this.map))
    })

    // log user clicks
    this.map.on('click', event => {
      const lat = event.latlng.lat
      const lng = event.latlng.lng;
      console.log(lat, lng);
    });

    /*L.polyline(dummyDataPath)
      .addTo(this.map);*/
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    )
  }
}
