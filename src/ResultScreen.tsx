import * as React from 'react';
import "./ResultScreen.css";

interface Weather {
  month: number;
  data: number
}

interface WeatherArray extends Array<Weather>{}

interface Props {
  temperature: WeatherArray;
  precipitation: WeatherArray;
  country: string;
  numPeople: number;
  departureDate: string;
  returnDate: string;
}

class ResultScreen extends React.Component<Props,any> {
    constructor(props: Props) {
      super(props);

    }

    handleCheck(event: any) {
      event.target.classList.toggle('checked');
    }

    render() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
      const numDays = CalculateVacationLength(this.props.departureDate, this.props.returnDate);
      const avgtemps = this.props.temperature;
      const avgprecip = this.props.precipitation;
      const departureMonth = parseInt(this.props.departureDate.substr(5,2));

      const clothingRecommendation = CalculateClothing(this.props.numPeople, numDays);
      const listItems = clothingRecommendation.map((recommendation) =>
        <li key={recommendation.id} onClick={this.handleCheck}>{recommendation.amount} {recommendation.id}</li>
      );
      let rainGear;
      let sunglasses;
      listItems.forEach((item,index) => {
        if(item.key == "Rain Gear (umbrellas or ponchos)") {
          rainGear = item;
          listItems.splice(index,1);
        }
        else if(item.key == "Sunglasses") {
          sunglasses = item;
          listItems.splice(index,1);
        }
      });

      return(
        <div className="Centered-box">
          <p>Here are our reccomendations on what you should pack for your {numDays}-day trip.</p>
          {avgtemps.length == 12 && <p>The average temperature for {months[departureMonth - 1]} is {avgtemps[departureMonth - 1].data.toFixed(2)}°C</p>}
          {avgprecip.length == 12 && <p>The average precipitation for {months[departureMonth - 1]} is {avgprecip[departureMonth - 1].data.toFixed(2)}mm</p>}
          <div className="Inner-box">
            <p>Each person should bring at least:</p>
            <ul>
              {listItems}
            </ul>
            <p>You should also bring:</p>
            <ul>
              {rainGear}
              {sunglasses}
            </ul>
          </div>
        </div>
      );
    }

}

export default ResultScreen;

function CalculateClothing(numPeople: number, numDays: number) {
  const fortnite = 14; //We will assume the user will be washing their clothes during vacations lasting more than 14 days.

  /* Clothes that will likely be utilized every day. */
  let dailyEssentials = [
    {id: 'Shirts', amount: 0},
    {id: 'Underwear', amount: 0},
    {id: 'Socks', amount: 0}
  ];

  /* Clothes that will likely be utilized at least once over the course of a week. 
    These generally don't need to be washed. */
  let weeklyEssentials = [
    {id: 'Bottoms', amount: 0},
    {id: 'Shoes', amount: 0},
    {id: 'Sweaters', amount: 0},
    {id: 'Hats', amount: 0},
    {id: 'Jackets', amount: 0}
  ];

  let weatherSpecific = [
    {id: 'Rain Gear (umbrellas or ponchos)', amount: 0}
  ];

  let activitySpecific = [
    {id: 'Bathing Suits', amount: 0}
  ];

  let accessories = [
    {id: 'Sunglasses', amount: 0}
  ]

  if (numDays > 0 && numDays <= fortnite) {
    dailyEssentials.forEach((item) => {
      item.amount = numDays;
    });
    weeklyEssentials.forEach((item) => {
      item.amount = 2;
    });
    weatherSpecific.forEach((item) => {
      item.amount = 1 * numPeople;
    });
    accessories.forEach((item) => {
      item.amount = 1 * numPeople;
    });
  } else if (numDays > fortnite) {
    dailyEssentials.forEach((item) => {
      item.amount = fortnite;
    });
    weeklyEssentials.forEach((item) => {
      item.amount = 2;
    });
    weatherSpecific.forEach((item) => {
      item.amount = 1 * numPeople;
    });
    accessories.forEach((item) => {
      item.amount = 1 * numPeople;
    });
  }

  const clothes = dailyEssentials.concat(weeklyEssentials, weatherSpecific, activitySpecific, accessories);
  return clothes;
}

function CalculateVacationLength(departureDate: string, returnDate: string) {
  /* Calculate the length of the trip in days. */
  const startDay = new Date(departureDate);
  const endDay = new Date(returnDate);
  const oneDayMS = 1000 * 60 * 60 * 24; //defines the length of a day in milliseconds
  const startDayMS = startDay.getTime();
  const endDayMS = endDay.getTime();
  const differenceMS = Math.abs(endDayMS - startDayMS);
  const numDays = Math.round(differenceMS / oneDayMS);

  return numDays;
}