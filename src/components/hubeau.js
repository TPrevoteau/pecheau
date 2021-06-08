import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import listOfRegion from "../region/region.json" ; 
import Meteo from "./meteo.js";
import Comments from "./Comments.js";

class Hubeau extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        data: [],
        selectedRegion: "centre",
      };
    
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {    
      this.setState({selectedRegion: event.target.value});  
      console.log(this.state.selectedRegion);
    }

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
      var stationByRegion = [];
      var selectedRegion = this.state.selectedRegion;
      const { error, isLoaded, data, items} = this.state;
      stationByRegion = items.filter(function(item){return (item.region === selectedRegion);});
      console.log(this.state.selectedRegion)

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        var fishId = 0;
        return (
         <div>
           <form className="hubeau-form" >
            <label>Région : </label>
              <select value={this.state.selectedRegion} onChange={this.handleChange}>
                <option value="auvergne" >Auvergne-Rhône-Alpes</option>
                <option value="bourgogne" >Bourgogne-Franche-Comté</option>
                <option value="bretagne" >Bretagne</option>
                <option value="centre" >Centre-Val de Loire</option>
                <option value="corse" >Corse</option>
                <option value="grandEst" >Grand Est</option>
                <option value="hautDeFrance" >Hauts-de-France</option>
                <option value="ileDeFrance" >Île-de-France</option>
                <option value="normandie" >Normandie</option>
                <option value="nouvelleAquitaine" >Nouvelle-Aquitaine</option>
                <option value="occitanie" >Occitanie</option>
                <option value="paysDeLaLoire" >Pays de la Loire</option>
                <option value="provence" >Provence-Alpes-Côte d'Azur</option>
              </select>
            </form>
            <MapContainer className="hubeau-map" center={[47, 2]} zoom={6}>
              <GeoJSON key="test" data={listOfRegion} />
              <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                            

                {stationByRegion.map(stationByRegion => <Marker key={stationByRegion.stationId} position={[stationByRegion.y, stationByRegion.x]} 
                eventHandlers={{click: (e) => {this.fishByStation(stationByRegion.stationId)}}}>
                  <Popup>  
                  <Meteo x={stationByRegion.x} y={stationByRegion.y}/>               
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
            

            </MapContainer> 
            <Comments stationId={stationByRegion.stationId}/>  

          </div>
        );
      }
    }
  }

  export default Hubeau;