import React from 'react';
import TimedButton from '../timed-button/TimedButton'

export default (props) => {
  let writeCode = <TimedButton
      onClick={props.addLine}
      resetSeconds={props.writeCodeReset}
    >Write Code</TimedButton>

  let drinkTea = <TimedButton
      onClick={props.drinkTea}
      resetSeconds={props.teaReset}
    >Drink Tea</TimedButton>

  let drinkCoffee = <TimedButton
      onClick={props.drinkCoffee}
      resetSeconds={props.coffeeReset}
    >Drink Coffee</TimedButton>

  let researchOverflow = <TimedButton
      onClick={props.researchOverflow}
      resetSeconds={props.overflowReset}
    >Research on Stack Overflow</TimedButton>

  let researchGithub = <TimedButton
      onClick={props.researchGithub}
      resetSeconds={props.githubReset}
    >Research on Github</TimedButton>

  return <div>
    {writeCode}
    {drinkTea}
    {drinkCoffee}
    {researchOverflow}
    {researchGithub}
  </div>
}
