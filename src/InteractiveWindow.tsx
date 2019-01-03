import * as React from 'react';
import "./InteractiveWindow.css";

import VacationForm from './VacationForm';
import ResultScreen from './ResultScreen';

interface State {
  resultComputed: boolean;
  temperature: number;
  country: string;
  numPeople: number;
  departureDate: string;
  returnDate: string;
}

interface ViewProps {
  resultComputed: boolean;
  temperature: number;
  country: string;
  numPeople: number;
  departureDate: string;
  returnDate: string;
  onSubmit: Function;
  onCountryChange: Function;
  onDateChange: Function;
  onPeopleChange: Function;
  onViewChange: Function;
}

class InteractiveWindow extends React.Component<any,State> {
    constructor(props: any) {
      super(props);
      this.handleCountryChange = this.handleCountryChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handlePeopleChange = this.handlePeopleChange.bind(this);
      this.handleViewChange = this.handleViewChange.bind(this);
      this.state = {
        resultComputed: false,
        temperature: 0,
        country: "",
        numPeople: 1,
        departureDate: "",
        returnDate: ""
      };
    }

    getWeather = async (event: any) => {
      const country = event.target.elements.country.value;
      const api_call = await fetch(`http://climatedataapi.worldbank.org/climateweb/rest/v1/country/cru/tas/month/${country}`);
      const temperatureData = await api_call.json();
      console.log(temperatureData);
      try {
      this.setState({temperature: temperatureData[0].data});
      }
      catch(err) {
        console.log(err);
      }
    }

    handleCountryChange(countryCode: string) {
      this.setState({country: countryCode});
    }

    handleDateChange(name: string, date: string) {
      const key = name as keyof State;
      this.setState({[key]: date} as any);
    }

    handlePeopleChange(n: number) {
      this.setState({numPeople: n});
    }

    handleViewChange(event: any) {
      this.setState({resultComputed:true});
    }

    render() {
      const resultComputed = this.state.resultComputed;
      const temperature = this.state.temperature;
      const country = this.state.country;
      const numPeople = this.state.numPeople;
      const startDay = this.state.departureDate;
      const endDay = this.state.returnDate;

      return (
        <div className="InteractiveWindow">
          <View 
            resultComputed={resultComputed} 
            temperature={temperature}
            country={country}
            numPeople={numPeople}
            departureDate={startDay} 
            returnDate={endDay} 
            onSubmit={this.getWeather}
            onCountryChange={this.handleCountryChange}
            onDateChange={this.handleDateChange} 
            onPeopleChange={this.handlePeopleChange}
            onViewChange={this.handleViewChange} />
        </div>
      );
    }
}

export default InteractiveWindow;

function Instructions() {
  return <p>Please fill out the following informaton about your trip.</p>;
}

function View(props: ViewProps) {
  const resultComputed = props.resultComputed;
    
  if (!resultComputed) {
    return (
      <div className="Instructions">
        <Instructions />
          <div className="Form">
            <VacationForm 
              country={props.country}
              numPeople={props.numPeople}
              departureDate={props.departureDate} 
              returnDate={props.returnDate} 
              onSubmit={props.onSubmit}
              onCountryChange={props.onCountryChange}
              onDateChange={props.onDateChange} 
              onPeopleChange={props.onPeopleChange}
              onViewChange={props.onViewChange} />
          </div>
      </div>
    );
  } else {
    return (
      <div className="Results">
        <ResultScreen temperature={props.temperature} country={props.country} numPeople={props.numPeople} departureDate={props.departureDate} returnDate={props.returnDate} />
      </div>
    );
  }
}
