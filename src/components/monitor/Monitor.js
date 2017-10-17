import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MonitorActions from './MonitorActions'

export class Monitor extends Component {
  render() {
    return (
    	<div>
    		<h1>MONITOR</h1>
    		{this.props.history.map((val) => {
    			return (<p key={val.id}>{val.call}:{val.response}</p>);
    		})}
    	</div>
    );
  }

  componentDidMount() {
  	console.log("ADDING CALL")
  	this.interval = setInterval(() => {
  		console.log("ADDING CALL")
  		this.props.addCall("Call", "Response");
  	}, 1000);
  }

  componentWillUnmount() {
  	clearInterval(this.interval);
  }
}

/**
 * Redux container
**/

function mapStateToProps(state) {
	return {...state};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		...MonitorActions
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);