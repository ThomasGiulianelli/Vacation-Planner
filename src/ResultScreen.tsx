import * as React from 'react';

interface Props {
  numPeople: number;
  departureDate: string;
  returnDate: string;
}

class ResultScreen extends React.Component<Props,any> {
    constructor(props: Props) {
      super(props);

    }

    render() {
      const clothingRecommendation = CalculateClothing(this.props.numPeople, this.props.departureDate, this.props.returnDate);
      const listItems = clothingRecommendation.map((recommendation) =>
        <li key={recommendation.id}>{recommendation.id} {recommendation.amount}</li>
      );

      return(
        <ul>
          {listItems}
        </ul>
      );
    }

}

export default ResultScreen;

function CalculateClothing(numPeople: number, departureDate: string, returnDate: string) {
  
  /* Clothes that will likely be utilized every day. */
  let dailyEssentials = [
    {id: 'numShirts', amount: 0},
    {id: 'numBottoms', amount: 0},
    {id: 'numUnderwear', amount: 0},
    {id: 'numSocks', amount: 0}
  ];

  /* Clothes that will likely be utilized at least once over the course of a week. 
    These generally don't need to be washed. */
  let weeklyEssentials = [
    {id: 'numShoes', amount: 0},
    {id: 'numSweaters', amount: 0},
    {id: 'numHats', amount: 0}
  ];

  let weatherSpecific = [
    {id: 'numJackets', amount: 0},
    {id: 'rainGear', amount: 0}
  ];

  let locationSpecific = [
    {id: 'bathingSuits', amount: 0}
  ];

  /* Calculate the length of the trip in days. */
  const startDay = new Date(departureDate);
  const endDay = new Date(returnDate);
  const oneDayMS = 1000 * 60 * 60 * 24; //defines the length of a day in milliseconds
  const startDayMS = startDay.getTime();
  const endDayMS = endDay.getTime();
  const differenceMS = Math.abs(endDayMS - startDayMS);
  const numDays = Math.round(differenceMS / oneDayMS);

  if (numDays > 0 && numDays < 7) {
    dailyEssentials.forEach((item) => {
      item.amount = numDays * numPeople;
    });
    weeklyEssentials.forEach((item) => {
      item.amount = 1 * numPeople;
    });
    weatherSpecific.forEach((item) => {
      item.amount = 1 * numPeople;
    });
  } else if (numDays >= 7) {
    dailyEssentials.forEach((item) => {
      item.amount = (7 + Math.round(numDays / 5)) * numPeople;
    });
    weeklyEssentials.forEach((item) => {
      item.amount = Math.round(numDays/7) * numPeople;
    });
    weatherSpecific.forEach((item) => {
      item.amount = 1 * numPeople;
    });
  }

  const clothes = dailyEssentials.concat(weeklyEssentials, weatherSpecific, locationSpecific);
  return clothes;
}