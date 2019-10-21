import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, Card, CardBody, Row, Col } from 'reactstrap'
//import APIManager from '../../modules/APIManager';

//import GoogleMap from '../GoogleMap/GoogleMap';
import loadOpenLayersMap from '../../modules/loadOpenLayersMap.js';



class OpenLayersMap extends Component {
    state = {
        openLayersMapsReady: false
    }

    componentWillMount() {
        loadOpenLayersMap((OpenLayers) => {
            // Work to do after the library loads.
            this.setState({ openLayersMapReady: true });

            var lat = 47.35387;
            var lon = 8.43609;
            var zoom = 18;

            var fromProjection = new OpenLayers.Projection("EPSG:4326");
            var toProjection = new OpenLayers.Projection("EPSG:900913");
            var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);

            var map = new OpenLayers.Map("Map");
            var mapnik = new OpenLayers.Layer.OSM();
            map.addLayer(mapnik);

            var markers = new OpenLayers.Layer.Markers("Markers");
            map.addLayer(markers);
            markers.addMarker(new OpenLayers.Marker(position));

            map.setCenter(position, zoom);

        })
    }

    /*
      getData = (Elements) => {
          APIManager.getAll(Elements).then((allElements) => {
              this.setState(() => {
                  return {
                      allElements: allElements
                  }
              })
          })
      }
  */
    componentDidMount() {
        //console.log("OpenLayersMap: ComponentDidMount", this.props.Elements);
        //this.getData(this.props.Elements)
    }

    /*
        mapScript = (OpenLayers) => {
    
            var lat = 47.35387;
            var lon = 8.43609;
            var zoom = 18;
    
            var fromProjection = new OpenLayers.Projection("EPSG:4326");
            var toProjection = new OpenLayers.Projection("EPSG:900913");
            var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    
            var map = new OpenLayers.Map("Map");
            var mapnik = new OpenLayers.Layer.OSM();
            map.addLayer(mapnik);
    
            var markers = new OpenLayers.Layer.Markers("Markers");
            map.addLayer(markers);
            markers.addMarker(new OpenLayers.Marker(position));
    
            map.setCenter(position, zoom);
    
        }
    */


    render() {
        console.log("pls render Elements")
        return (
            <>
                <Card>
                    <CardBody>
                        <div className="MapsComponent">


                            <div id="openLayersMap" style="height:250px"></div>
                            {/* {this.mapScript()} */}

                            {this.state.openLayersMapReady ? this.mapScript() : ''}

                        </div>


                    </CardBody>

                </Card>

            </>
        )

    }
}

export default OpenLayersMap;
