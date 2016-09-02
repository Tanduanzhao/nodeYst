import React, {
	Component
}
from 'react';
export
default class FooterBarIcon extends Component {
	render() {
		return (
			<a href="#" onClick={this.props.fn} style={this.props.style}  className="tab-item">
				<i className={"ion-"+this.props.icon + " icon"}></i>
				<span>{this.props.title}</span>
			</a>
		)
	}
}