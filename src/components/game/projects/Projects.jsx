import React from 'react';
import PercButton from '../perc-button/PercButton'

export default (props) => {
  return <div>
    <h3>Projects</h3>
    {props.projects.map(val => (
      <div key={val.id}>
        <h4>{val.title}</h4>
        <PercButton
          total={val.total}
          complete={val.complete}
          onClick={val.onClick}
          disabled={val.disabled}
          selected={val.selected}
        >
          {val.complete < val.total ? `${val.complete}/${val.total}` : 'Commit Code'}
        </PercButton>
      </div>
    ))}
  </div>
}
