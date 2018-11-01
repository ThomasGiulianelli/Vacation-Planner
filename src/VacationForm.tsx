import * as React from 'react';

interface Props {
  departureDate: string;
  returnDate: string;
  onDataChange: Function;
  onViewChange: Function;
}

class VacationForm extends React.Component<Props,any> {
    constructor(props: Props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event: any) {
      const name = event.target.name;
      const date = event.target.value;

      this.props.onDataChange(name, date);
    }
  
    handleSubmit(event: any) {
      alert('Your dates are: ' + this.props.departureDate + ' ' + this.props.returnDate);
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
            <input name="returnDate" type="date" min={this.props.departureDate} onChange={this.handleChange}></input>
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default VacationForm;