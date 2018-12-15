import * as React from 'react';

interface Props {
  numPeople: number;
  departureDate: string;
  returnDate: string;
  onDateChange: Function;
  onPeopleChange: Function;
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
      if (name === "numPeople") {
        this.props.onPeopleChange(event.target.value);
      }
      else {
        const date = event.target.value;
        this.props.onDateChange(name, date);
      }
    }
  
    handleSubmit(event: any) {
      alert('Your numPeople is ' + this.props.numPeople);
      this.props.onViewChange(event.target.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            How many people are going on this trip?
            <select name="numPeople" value={this.props.numPeople} onChange={this.handleChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </select>
          </label>
          <br/>
          <label>
            Select the departure date:
            <input name="departureDate" type="date" onChange={this.handleChange} required></input>
          </label>
          <br/>
          <label>
            Select the return date:
            <input name="returnDate" type="date" min={this.props.departureDate} onChange={this.handleChange} required></input>
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default VacationForm;