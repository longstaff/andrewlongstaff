import React from 'react';
import Display from '../display/Display';
import Buttons from '../buttons/Buttons'

export default (props) => (
  <div>
    <Display
      count={props.totalCodeLines}
      quitHandler={props.quitHandler}
    />
    <Buttons
      addLine = {() => {props.addCode(1);}}
      drinkTea = {() => {props.addCaffine(1);}}
      drinkCoffee = {() => {props.addCaffine(3);}}
      researchOverflow = {() => {props.addCode(100);}}
      researchGithub = {() => {props.addCode(1000);}}
      writeCodeReset = {Math.max(0.5, 5 - props.caffine)}
      teaReset = {20}
      coffeeReset = {50}
      overflowReset = {100}
      githubReset = {500}
    >Write Code</Buttons>
  </div>
);
