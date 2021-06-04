import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import centre from "../region/centre.json";
import Meteo from "./meteo.js";

class Hubeau extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        data: [],
        region: []
      };
    }

//https://mbm11j64gj.execute-api.eu-west-3.amazonaws.com/default/GetCodeStation
    componentDidMount() {
      fetch("https://mbm11j64gj.execute-api.eu-west-3.amazonaws.com/default/GetCodeStation")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.Items
          });
        }
      )
    }

    fishByStation(stationId){
      console.log(stationId)
      fetch("https://hubeau.eaufrance.fr/api/v0/etat_piscicole/poissons?code_station="+ stationId +"%2C01020102&format=json&size=20")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }


    render() {
      const { error, isLoaded, data, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        var fishId = 0;
        return (
         <div>
              <MapContainer center={[49.766063546, 3.188467932]} zoom={7} scrollWheelZoom={false}>
            
             <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                           

              {items.map(items => <Marker key={items.stationId} position={[items.y, items.x]} 
              eventHandlers={{click: (e) => {this.fishByStation(items.stationId)}}}>
                <Popup>
                  <Meteo x={items.x} y={items.y}/>
                   <ul>
                    {          
                       data.map(data => (
                        <li key={fishId++}>
                          {data.nom_poisson + " : " + data.effectif} 
                        </li>
                        ))
                    }
                  </ul>
                </Popup>
              </Marker>)
              }
              <GeoJSON data={centre} />
            </MapContainer>
          </div>
        );
      }
    }
  }

  export default Hubeau;