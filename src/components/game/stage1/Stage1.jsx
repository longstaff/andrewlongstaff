import React from 'react';
import Display from '../display/Display';
import Buttons from '../buttons/Buttons'
import Projects from '../projects/Projects'

export default (props) => (
  <div>
    <Display
      count={props.totalCodeLines}
      quitHandler={props.quitHandler}
    />
    <Buttons
      buttons={props.buttons}
    />
    <Projects
      projects={props.projects}
    />
  </div>
);
