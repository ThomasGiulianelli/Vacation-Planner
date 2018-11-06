import * as React from 'react';
import "./InteractiveWindow.css";

import VacationForm from './VacationForm';
import ResultScreen from './ResultScreen';

interface State {
  resultComputed: boolean;
  numPeople: number;
  departureDate: string;
  returnDate: string;
}

interface ViewProps {
  resultComputed: boolean;
  numPeople: number;
  departureDate: string;
  returnDate: string;
  onDateChange: Function;
  onPeopleChange: Function;
  onViewChange: Function;
}

class InteractiveWindow extends React.Component<any,State> {
    constructor(props: any) {
      super(props);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handlePeopleChange = this.handlePeopleChange.bind(this);
      this.handleViewChange = this.handleViewChange.bind(this);
      this.state = {
        resultComputed: false,
        numPeople: 1,
        departureDate: "",
        returnDate: ""
      };
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
      const numPeople = this.state.numPeople;
      const startDay = this.state.departureDate;
      const endDay = this.state.returnDate;

      return (
        <div className="InteractiveWindow">
          <View 
            resultComputed={resultComputed} 
            numPeople={numPeople}
            departureDate={startDay} 
            returnDate={endDay} 
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
              numPeople={props.numPeople}
              departureDate={props.departureDate} 
              returnDate={props.returnDate} 
              onDateChange={props.onDateChange} 
              onPeopleChange={props.onPeopleChange}
              onViewChange={props.onViewChange} />
          </div>
      </div>
    );
  } else {
    return (
      <div className="Results">
        <p>Results and reccomendations go here.</p>
        <ResultScreen numPeople={props.numPeople} departureDate={props.departureDate} returnDate={props.returnDate} />
      </div>
    );
  }
}
