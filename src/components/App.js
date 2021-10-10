import React, {Component} from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";

//Klucz do API
const APIKey = "9b8779499483f4a617bd43e164a1a41f";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // handleCitySubmit = (e) => {
  //   e.preventDefault();
  //   const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;

  //   fetch(API)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error("Nie udało się");
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const time = new Date().toLocaleString();
  //       this.setState((prevState) => ({
  //         err: false,
  //         date: time,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         temp: data.main.temp,
  //         pressure: data.main.pressure,
  //         wind: data.wind.speed,
  //         city: prevState.value,
  //       }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState((prevState) => ({
  //         err: true,
  //         city: prevState.value,
  //       }));
  //     });
  // };

  componentDidUpdate(prevProps, prevState) {
    // console.log("poprzednia wartość " + prevState.value);
    // console.log("aktualna wartość " + this.state.value);

    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;

      fetch(API)
        .then((response) => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało się");
        })
        .then((response) => response.json())
        .then((data) => {
          const time = new Date().toLocaleString();
          this.setState((prevState) => ({
            err: false,
            date: time,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            city: prevState.value,
          }));
        })
        .catch((err) => {
          console.log(err);
          this.setState((prevState) => ({
            err: true,
            city: prevState.value,
          }));
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
