import React from 'react';
import PercButton from '../perc-button/PercButton'

export default (props) => {
  return <div>
    <h3>Projects</h3>
    {props.projects.map(val => (
      <PercButton
        key={val.id}
        total={val.total}
        complete={val.complete}
        onClick={val.onClick}
        disabled={val.disabled}
        selected={val.selected}
      >
        {val.title}
      </PercButton>
    ))}
  </div>
}
