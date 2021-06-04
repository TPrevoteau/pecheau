import React from "react";
const CONFIG = require('../config');

/**
 * Meteo is a react component
 * Props needed : x (longitude)
 *                y (latitude)
 */
class Meteo extends React.Component {
    constructor(props) {
      super(props);
      // x and y are props for coordinates
      this.x = this.props.x;
      this.y = this.props.y;
      this.state = {
        isLoaded: false,
        error: null,
        weatherText: null,
        weatherIcon: null,
        weatherTemp: null
      }
    }

    componentDidMount() {
      // Reset state
      this.setState({
        isLoaded: false,
        error: null,
        weatherText: null,
        weatherIcon: null,
        weatherTemp: null
      });
      // Build GET Url for worldweatheronline.com api
      var apiKey = CONFIG.weather.apiKey;
      var apiUrl = CONFIG.weather.apiUrl;
      var requestUrl = `${apiUrl}?key=${apiKey}&q=${this.y},${this.x}&mca=no&fx=no&lang=fr&format=json`;
      fetch(requestUrl)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.data.error) {
            this.setState({
              isLoaded: true,
              error: true
            });
          } else {
            // Find french translation for weather text
            var weatherText;
            if (result && result.data && result.data.current_condition && result.data.current_condition[0] && result.data.current_condition[0].lang_fr && result.data.current_condition[0].lang_fr[0])
              weatherText = result.data.current_condition[0].lang_fr[0].value;
            else if (result && result.data && result.data.current_condition && result.data.current_condition[0] && result.data.current_condition[0].weatherDesc && result.data.current_condition[0].weatherDesc[0])
              weatherText = result.data.current_condition[0].weatherDesc[0].value;
            // Find weather icon
            var weatherIcon;
            if (result && result.data && result.data.current_condition && result.data.current_condition[0] && result.data.current_condition[0].weatherIconUrl && result.data.current_condition[0].weatherIconUrl[0])
              weatherIcon = result.data.current_condition[0].weatherIconUrl[0].value;
            // Find weather temperature
            var weatherTemp;
              if (result && result.data && result.data.current_condition && result.data.current_condition[0] && result.data.current_condition[0].temp_C)
                weatherTemp = result.data.current_condition[0].temp_C;
            // Update state
            this.setState({
              isLoaded: true,
              weatherText: weatherText,
              weatherIcon: weatherIcon,
              weatherTemp: weatherTemp
            });
          }
        }
      )
    }

    render() {
      const { isLoaded, error, weatherText, weatherIcon, weatherTemp } = this.state;
      if (!isLoaded) {
        return <div>Chargement de la météo...</div>;
      } else if (error) {
        return <div>La météo n'a pas pu être chargée.</div>;
      } else {
        return (
         <div className="weather">
            <img className="weather-icon" src={weatherIcon} alt=""/>
            <div className="weather-text">{weatherText}</div>
            <div className="weather-temp">{weatherTemp}°C</div>
          </div>
        );
      }
    }
  }

  export default Meteo;