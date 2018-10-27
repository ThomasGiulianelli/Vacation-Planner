import * as React from 'react';

export interface Props {}

class VacationForm extends React.Component<any,any> {
    constructor(props: any) {
      super(props);
      this.state = {
          departureDate: "",
          returnDate: ""
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event: any) {
      const name = event.target.name;
      this.setState({[name]: event.target.value});
    }
  
    handleSubmit(event: any) {
      alert('Your dates are: ' + this.state.departureDate + ' ' + this.state.returnDate);
      this.props.onViewChange(event.target.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Select the departure date:
            <input name="departureDate" type="date" onChange={this.handleChange}></input>
          </label>
          <br/>
          <label>
            Select the return date:
            <input name="returnDate" type="date" min={this.state.departureDate} onChange={this.handleChange}></input>
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default VacationForm;