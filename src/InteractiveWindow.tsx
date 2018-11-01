import * as React from 'react';

import VacationForm from './VacationForm';

interface State {
  resultComputed: boolean;
  departureDate: string;
  returnDate: string;
}

interface ViewProps {
  resultComputed: boolean;
  departureDate: string;
  returnDate: string;
  onDataChange: Function;
  onViewChange: Function;
}

class InteractiveWindow extends React.Component<any,State> {
    constructor(props: any) {
      super(props);
      this.handleDataChange = this.handleDataChange.bind(this);
      this.handleViewChange = this.handleViewChange.bind(this);
      this.state = {
        resultComputed: false,
        departureDate: "",
        returnDate: ""
      };
    }

    handleDataChange(name: string, date: string) {
      const key = name as keyof State;
      this.setState({[key]: date} as any);
    }

    handleViewChange(event: any) {
      this.setState({resultComputed:true});
    }

    render() {
      const resultComputed = this.state.resultComputed;
      const startDay = this.state.departureDate;
      const endDay = this.state.returnDate;

      return (
        <div>
          <View 
            resultComputed={resultComputed} 
            departureDate={startDay} 
            returnDate={endDay} 
            onDataChange={this.handleDataChange} 
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
      <div>
        <Instructions />
          <div>
            <VacationForm 
              departureDate={props.departureDate} 
              returnDate={props.returnDate} 
              onDataChange={props.onDataChange} 
              onViewChange={props.onViewChange} />
          </div>
      </div>);
  } else {
    return <div><p>Results and reccomendations go here.</p></div>;
  }
}
