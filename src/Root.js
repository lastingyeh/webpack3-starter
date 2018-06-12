import React from 'react';
import money from './images/circle.svg'; 

export default class Root extends React.Component {
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
			<img src={money} alt='circle'/>
				<h1>Hello World</h1>
			</div>
		);
	}
}
