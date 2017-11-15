import React from 'react';
import './Glitch.css';

export default (props) => (
  <span className={`glitch ${props.className}`} data-text={props.children}>{props.children}</span>
);
