import React from 'react';
import money from './images/money-bag.svg';
import './app.scss'  

export default class Root extends React.Component {
	render() {
		return (
			<div style={{ textAlign: 'center' }}>
			<img src={money} alt='money-bag'/>
				<h1>Hello World</h1>
			</div>
		);
	}
}
